import AWSMock from 'aws-sdk-mock';
import * as AWS from 'aws-sdk';
import { PutItemInput } from 'aws-sdk/clients/dynamodb';
import * as createPersonEvent from './fixtures/create-person-event';
import DynamoClient from '../src/clients/dynamo';
import SUCCESS from './fixtures/dynamo-output';

AWSMock.setSDKInstance(AWS);
AWSMock.mock('DynamoDB.DocumentClient', 'put', (params: PutItemInput, callback: Function) => {
  callback(null, { Attributes: params.Item });
});

describe('Dynamo Client', () => {
  it('Handles createPerson request', async () => {
    const dynamoClient = new DynamoClient({ tableName: 'table-name' });
    jest.spyOn(dynamoClient.client, 'put');
    const result = await dynamoClient.createPerson(JSON.parse(createPersonEvent.VALID.body));
    expect(dynamoClient.client.put).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(SUCCESS);
  });
});
