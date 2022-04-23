import { CfnOutput, Duration } from 'aws-cdk-lib';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

interface CustomNodejsFunctionProps extends NodejsFunctionProps {
  outputName: string;
}

export default class Lambda extends NodejsFunction {
  constructor(scope: Construct, id: string, props: CustomNodejsFunctionProps) {
    super(scope, id, {
      ...props,
      runtime: props.runtime ?? Runtime.NODEJS_14_X,
      awsSdkConnectionReuse: props.awsSdkConnectionReuse ?? true,
      memorySize: props.memorySize ?? 256,
      logRetention: props.logRetention ?? RetentionDays.ONE_WEEK,
      timeout: props.timeout ?? Duration.seconds(30),
      environment: {
        LOG_LEVEL: 'INFO',
        ...(props.environment || {}),
      },
    });

    new CfnOutput(scope, `${id}LambdaArnOutput`, {
      value: this.functionArn,
      description: `NodeJs Lambda Function ${props.outputName} ARN`,
      exportName: props.outputName,
    });
  }
}
