import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const appConfig = {
  rootDir: path.resolve(__dirname, '../../'),
  port: process.env.PORT || 8000,
  host: process.env.HOSTS?.split(',') || 'localhost',
  swagger: process.env.SWAGGER === 'true' || false,
};
