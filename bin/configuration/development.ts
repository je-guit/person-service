import { PropsI } from './props';

const DevConfiguration: PropsI = {
  description: 'CDK Person Service Stack Dev',
  stackName: 'person-service-dev',
  tags: {},
  env: {
    region: 'eu-west-1',
    account: '',
  },
  defaults: {
    lambda: {
      provisionedConcurrency: null,
      retentionDays: 5,
      memorySizeMb: 256,
      timeoutSeconds: 30,
    },
    sqs: {
      deadLetterQueue: {
        maxReceiveCount: 5,
        namePrefix: 'dlq-',
      },
    },
  },
};

export default DevConfiguration;
