import { Context } from 'aws-lambda';
import Initializer from '../../services/initializer';
import Logger from '../../services/logger';

// For simplicity reusing Initializer, note that this will create an unused dynamo client.
const { configuration } = new Initializer({ env: process.env });

export const handler = async (event: any, context: Context) => {
  const logger = new Logger({ context, logLevel: configuration.LOG_LEVEL });
  logger.info('Person created event coming in', { event });
};

export default handler;
