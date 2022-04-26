import * as winston from 'winston';
import { Context } from 'aws-lambda';

type LogDetails = Record<string, any>;

interface LoggerInput {
  context: Context,
  logLevel?: string,
}

interface LogContext {
  awsRequestId: Context['awsRequestId'],
  functionName: Context['functionName'],
}

export default class Logger {
  private logContext: LogContext;

  private logger: winston.Logger;

  constructor({ context, logLevel }: LoggerInput) {
    const {
      awsRequestId, functionName,
    } = context;
    this.logContext = { awsRequestId, functionName };
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          level: logLevel?.toLowerCase() || 'info',
        }),
      ],
    });
  }

  private callLogger(logger: winston.LeveledLogMethod, message: string, details?: LogDetails) {
    logger({ ...(details || {}), ...this.logContext, message });
  }

  public debug(message: string, details?: LogDetails) {
    this.callLogger(this.logger.debug, message, details);
  }

  public info(message: string, details?: LogDetails) {
    this.callLogger(this.logger.info, message, details);
  }

  public warn(message: string, details?: LogDetails) {
    this.callLogger(this.logger.warn, message, details);
  }

  public error(message: string, details?: LogDetails) {
    this.callLogger(this.logger.error, message, details);
  }
}
