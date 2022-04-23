import { StackProps } from 'aws-cdk-lib';

export enum Environment {
  DEV = 'dev',
}

export interface PersonStackProps extends StackProps {
  environment: Environment,
  restApi: {
    person: {
      stageName: string,
    },
  },
}
