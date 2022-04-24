import { Context } from 'aws-lambda';

const DEFAULT: Context = {
  callbackWaitsForEmptyEventLoop: true,
  functionName: 'string',
  functionVersion: 'string',
  invokedFunctionArn: 'string',
  memoryLimitInMB: 'string',
  awsRequestId: 'string',
  logGroupName: 'string',
  logStreamName: 'string',
  getRemainingTimeInMillis: () => 1000,
  done: () => null,
  fail: () => null,
  succeed: () => null,
};

export default DEFAULT;
