import { Duration, Stack } from 'aws-cdk-lib';
import { LambdaIntegration, RequestValidator } from 'aws-cdk-lib/aws-apigateway';
import { AttributeType, StreamViewType } from 'aws-cdk-lib/aws-dynamodb';
import { StartingPosition } from 'aws-cdk-lib/aws-lambda';
import { DynamoEventSource, SqsDlq } from 'aws-cdk-lib/aws-lambda-event-sources';
import { Queue, QueueEncryption } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
import { PersonStackProps } from '../bin/stack-environment-types';
import DynamoTable from './cdk-constructs/dynamo-table-construct';
import Lambda from './cdk-constructs/lambda-construct';
import RestApi from './cdk-constructs/rest-api-construct';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export default class PersonServiceStack extends Stack {
  constructor(scope: Construct, id: string, props: PersonStackProps) {
    super(scope, id, props);

    const personTable = new DynamoTable(this, 'personTable', {
      outputName: 'personTable',
      partitionKey: { name: 'id', type: AttributeType.STRING },
      stream: StreamViewType.NEW_AND_OLD_IMAGES,
    });

    const createPersonLambda = new Lambda(this, 'createPerson', {
      outputName: 'createPersonLambda',
      entry: 'src/assets/create-person/index.ts',
      environment: {
        TABLE_NAME: personTable.tableName,
        LOG_LEVEL: 'DEBUG',
      },
    });

    personTable.grantReadWriteData(createPersonLambda);

    const personApiGateway = new RestApi(this, 'person', {
      outputName: 'personRestApi',
      stageName: props.restApi.person.stageName,
      apiKey: true,
      usagePlan: {
        throttle: { // only for demo purposes to make sure the api is not excessively used.
          rateLimit: 1,
          burstLimit: 1,
        },
      },
    });

    const createPersonApiValidator = new RequestValidator(this, 'personRequestValidator', {
      restApi: personApiGateway,
    });

    const personResource = personApiGateway.root.addResource('person');
    personResource.addMethod('POST', new LambdaIntegration(createPersonLambda), {
      apiKeyRequired: true,
      requestValidator: createPersonApiValidator,
    });

    const personCreatedLambda = new Lambda(this, 'personCreated', {
      outputName: 'personCreatedLambda',
      entry: 'src/assets/person-created/index.ts',
      environment: {
        TABLE_NAME: personTable.tableName,
        LOG_LEVEL: 'DEBUG',
      },
    });

    const personCreatedDlq = new Queue(this, 'personCreatedDLQ', {
      retentionPeriod: Duration.days(7),
      encryption: QueueEncryption.KMS_MANAGED,
    });

    personCreatedLambda.addEventSource(new DynamoEventSource(personTable, {
      startingPosition: StartingPosition.LATEST,
      batchSize: 5,
      bisectBatchOnError: true,
      onFailure: new SqsDlq(personCreatedDlq),
      retryAttempts: 10,
    }));
  }
}
