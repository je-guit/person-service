import Logger from '../src/services/logger';
import DEFAULT from './fixtures/lambda-context';

const logger = new Logger({
  context: DEFAULT,
  logLevel: 'WARN',
});
jest.spyOn(logger.logger, 'debug');
jest.spyOn(logger.logger, 'info');
jest.spyOn(logger.logger, 'warn');
jest.spyOn(logger.logger, 'error');

describe('Logger', () => {
  it('Sets right logLevel', async () => {
    expect(logger.logger.isDebugEnabled()).toStrictEqual(false);
    expect(logger.logger.isInfoEnabled()).toStrictEqual(false);
    expect(logger.logger.isWarnEnabled()).toStrictEqual(true);
    expect(logger.logger.isErrorEnabled()).toStrictEqual(true);
  });
  it('Sets default logLevel to info', async () => {
    const differentLogger = new Logger({
      context: DEFAULT,
    });
    expect(differentLogger.logger.isDebugEnabled()).toStrictEqual(false);
    expect(differentLogger.logger.isInfoEnabled()).toStrictEqual(true);
    expect(differentLogger.logger.isWarnEnabled()).toStrictEqual(true);
    expect(differentLogger.logger.isErrorEnabled()).toStrictEqual(true);
  });
  it('Calls winston debug', async () => {
    logger.debug('bla');
    expect(logger.logger.debug).toHaveBeenCalledTimes(1);
    expect(logger.logger.info).toHaveBeenCalledTimes(0);
    expect(logger.logger.warn).toHaveBeenCalledTimes(0);
    expect(logger.logger.error).toHaveBeenCalledTimes(0);
  });
  it('Calls winston info', async () => {
    logger.info('bla');
    expect(logger.logger.debug).toHaveBeenCalledTimes(0);
    expect(logger.logger.info).toHaveBeenCalledTimes(1);
    expect(logger.logger.warn).toHaveBeenCalledTimes(0);
    expect(logger.logger.error).toHaveBeenCalledTimes(0);
  });
  it('Calls winston warn', async () => {
    logger.warn('bla');
    expect(logger.logger.debug).toHaveBeenCalledTimes(0);
    expect(logger.logger.info).toHaveBeenCalledTimes(0);
    expect(logger.logger.warn).toHaveBeenCalledTimes(1);
    expect(logger.logger.error).toHaveBeenCalledTimes(0);
  });
  it('Calls winston error', async () => {
    logger.error('bla');
    expect(logger.logger.debug).toHaveBeenCalledTimes(0);
    expect(logger.logger.info).toHaveBeenCalledTimes(0);
    expect(logger.logger.warn).toHaveBeenCalledTimes(0);
    expect(logger.logger.error).toHaveBeenCalledTimes(1);
  });
});
