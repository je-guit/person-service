import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { PropsI } from '../bin/configuration/props';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export default class PersonServiceStack extends Stack {
  constructor(scope: Construct, id: string, props: PropsI) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkPersonServiceQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
