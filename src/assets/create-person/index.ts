import { Context } from 'aws-lambda';
import Initializer from '../../services/initializer';
import Logger from '../../services/logger';
import PersonValidator from '../../services/person-validator';
import ResponseBuilder from '../../services/resoponse-builder';
import { safeParse } from '../../utils';

const { configuration, dynamoClient } = new Initializer({ env: process.env });

export const handler = async (event: any, context: Context) => {
  const logger = new Logger({ context, logLevel: configuration.LOG_LEVEL });
  logger.debug('Incoming event', { event });
  const responseBuilder = new ResponseBuilder({ logger });
  try {
    const body = safeParse(event?.body);
    const personValidator = new PersonValidator({ logger, person: body });
    const invalidPersonElements = personValidator.getInvalidElements();
    if (invalidPersonElements.length > 0) {
      return responseBuilder.badRequest({ reason: invalidPersonElements });
    }
    const createResult = await dynamoClient.createPerson(body);
    logger.info('Create result', { createResult });
    return responseBuilder.success({ message: 'Successfully stored.' });
  } catch (err: any) {
    logger.error('Something failed', { errorMessage: err.message, errorStack: err.stack });
    return responseBuilder.internalServerError('An unexpected error occurred.');
  }
};

export default handler;
