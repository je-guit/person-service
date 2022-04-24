import { Template } from 'aws-cdk-lib/assertions';
import { personServiceStackDev } from '../bin/person-service';

describe('CDK', () => {
  test('creates a serverless Dynamo table', () => {
    const template = Template.fromStack(personServiceStackDev);
    template.resourceCountIs('AWS::DynamoDB::Table', 1);
    template.hasResourceProperties('AWS::DynamoDB::Table', {
      BillingMode: 'PAY_PER_REQUEST',
    });
  });
  test('creates 3 lambdas (2 functional 1 log retention)', () => {
    const template = Template.fromStack(personServiceStackDev);
    template.resourceCountIs('AWS::Lambda::Function', 3);
  });
});
