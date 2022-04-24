import { handler as createPersonHandler } from '../src/assets/create-person';
import lambdaContext from './fixtures/lambda-context';
import * as createPersonEvent from './fixtures/create-person-event';
import * as responses from './fixtures/responses';
import DynamoClient from '../src/clients/dynamo';
import Logger from '../src/services/logger';

jest.mock('../src/clients/dynamo');
jest.mock('../src/services/logger');

describe('Create person', () => {
  it('Returns 200 on success', async () => {
    const result = await createPersonHandler(createPersonEvent.VALID, lambdaContext);
    expect(result).toStrictEqual(responses.SUCCESS);
    expect(DynamoClient.prototype.createPerson).toHaveBeenCalledTimes(1);
    expect(DynamoClient.prototype.createPerson).toHaveBeenCalledWith(
      JSON.parse(createPersonEvent.VALID.body),
    );
    expect(Logger.prototype.error).toHaveBeenCalledTimes(0);
  });
  it('Returns 500 on failure', async () => {
    jest.spyOn(DynamoClient.prototype, 'createPerson').mockImplementation(() => {
      throw new Error();
    });
    const result = await createPersonHandler(createPersonEvent.VALID, lambdaContext);
    expect(result).toStrictEqual(responses.INTERNAL_SERVER_ERROR);
    expect(DynamoClient.prototype.createPerson).toHaveBeenCalledTimes(1);
    expect(DynamoClient.prototype.createPerson).toHaveBeenCalledWith(
      JSON.parse(createPersonEvent.VALID.body),
    );
    expect(Logger.prototype.error).toHaveBeenCalledTimes(1);
  });
  it('Returns 400 on missing element', async () => {
    const result = await createPersonHandler(createPersonEvent.MISSING_NAME, lambdaContext);
    expect(result).toStrictEqual(responses.BAD_REQUEST_MISSING_NAME);
    expect(DynamoClient.prototype.createPerson).toHaveBeenCalledTimes(0);
  });
  it('Returns 400 on invalid element', async () => {
    // eslint-disable-next-line max-len
    const result = await createPersonHandler(createPersonEvent.INVALID_TELEPHONE_NUMBER, lambdaContext);
    expect(result).toStrictEqual(responses.BAD_REQUEST_INVALID_TELEPHONE_NUMBER);
    expect(DynamoClient.prototype.createPerson).toHaveBeenCalledTimes(0);
  });
});
