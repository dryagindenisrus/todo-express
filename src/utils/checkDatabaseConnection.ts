import { prisma } from '@/lib/prisma';

/**
 * Checks the database connection using Prisma ORM.
 *
 * This function attempts to connect to the database and logs a success message if the connection is successful.
 * If the connection fails, it logs the error and exits the process with a status code of 1.
 *
 * @async
 * @function checkDatabaseConnection
 * @returns {Promise<void>} Resolves if the connection is successful, otherwise exits the process.
 * @throws Will log an error and terminate the process if the connection fails.
 */
export const checkDatabaseConnection = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to the database successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};
