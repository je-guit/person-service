import DynamoClient from '../../clients/dynamo';

interface InitializerInput {
  env: Record<string, string | undefined>,
}

interface Configuration {
  LOG_LEVEL?: string,
  TABLE_NAME?: string,
}

export default class Initializer {
  public configuration: Configuration;

  public dynamoClient: DynamoClient;

  constructor({ env }: InitializerInput) {
    const { LOG_LEVEL, TABLE_NAME } = env;
    this.configuration = { LOG_LEVEL, TABLE_NAME };
    if (!TABLE_NAME) {
      throw new Error('No TABLE_NAME found in environment variables.');
    }
    this.dynamoClient = new DynamoClient({ tableName: TABLE_NAME });
  }
}
