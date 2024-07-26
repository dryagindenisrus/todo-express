import { prisma } from "@/lib/prisma";

export const checkDatabaseConnection = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to the database successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};