import Logger from '../logger';

interface ResponseBuilderInput {
  logger: Logger,
}

export default class ResponseBuilder {
  private logger: Logger;

  constructor({ logger }: ResponseBuilderInput) {
    this.logger = logger;
  }

  success(data: string | Record<string, any>) {
    this.logger.info('Responding 200.');
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Ok',
        data,
      }),
    };
  }

  internalServerError(details: string | Record<string, any>) {
    this.logger.warn('Responding 500.', { details });
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
        details,
      }),
    };
  }

  badRequest(details: string | Record<string, any>) {
    this.logger.info('Responding 400.', { details });
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Bad Request',
        details,
      }),
    };
  }
}
