import { createLogger, Logger } from 'winston';
import { loggerConfig } from '@/config/logger';

/**
 * Creates and configures a Winston logger instance.
 *
 * This logger is used for logging messages throughout the application.
 * It is configured based on the settings provided in the `loggerConfig` object.
 *
 * @module src/utils/logger
 * @returns {Logger} The configured Winston logger instance.
 */
export const logger: Logger = createLogger(loggerConfig);
