import { CfnOutput } from 'aws-cdk-lib';
import * as DynamoDB from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

interface CustomTableProps extends DynamoDB.TableProps {
  outputName: string;
}

export default class DynamoTable extends DynamoDB.Table {
  constructor(scope: Construct, id: string, props: CustomTableProps) {
    super(scope, id, {
      ...props,
      billingMode: DynamoDB.BillingMode.PAY_PER_REQUEST,
    });

    new CfnOutput(scope, `${id}TableArnOutput`, {
      value: this.tableArn,
      description: `Dynamo Table ${props.outputName} ARN`,
      exportName: props.outputName,
    });
  }
}
