import Initializer from '../src/services/initializer';

describe('Initializer', () => {
  it('Initializes successfully', async () => {
    const tableName = 'nameOfTable';
    const logLevel = 'DEBUG';
    const initializer = new Initializer({
      env: {
        TABLE_NAME: tableName,
        LOG_LEVEL: logLevel,
      },
    });
    expect(initializer.configuration.TABLE_NAME).toStrictEqual(tableName);
    expect(initializer.configuration.LOG_LEVEL).toStrictEqual(logLevel);
  });
  it('Fails to initialize without TABLE_NAME', async () => {
    const logLevel = 'DEBUG';
    expect(() => new Initializer({
      env: {
        LOG_LEVEL: logLevel,
      },
    })).toThrow('No TABLE_NAME found in environment variables.');
  });
});
