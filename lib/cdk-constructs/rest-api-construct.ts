import { CfnOutput } from 'aws-cdk-lib';
import * as ApiGateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

interface CustomRestApiProps extends ApiGateway.RestApiProps {
  outputName: string;
  stageName: string;
  apiKey: boolean;
  usagePlan: ApiGateway.UsagePlanProps,
}

export default class RestApi extends ApiGateway.RestApi {
  constructor(scope: Construct, id: string, props: CustomRestApiProps) {
    super(scope, id, {
      ...props,
      endpointTypes: props.endpointTypes ?? [ApiGateway.EndpointType.EDGE],
      deployOptions: {
        stageName: props.stageName,
      },
    });

    const usagePlan = this.addUsagePlan(`${id}UsagePlan`, props.usagePlan);
    usagePlan.addApiStage({
      stage: this.deploymentStage,
    });

    if (props.apiKey) {
      const apiKey = this.addApiKey(`${id}ApiKey`);
      usagePlan.addApiKey(apiKey);
    }

    new CfnOutput(scope, `${id}RestApiIdOutput`, {
      value: this.restApiId,
      description: `Rest API ${props.outputName} ID`,
      exportName: props.outputName,
    });
  }
}
