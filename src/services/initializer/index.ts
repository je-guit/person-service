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
    this.dynamoClient = new DynamoClient({ tableName: TABLE_NAME || '' });
  }
}
