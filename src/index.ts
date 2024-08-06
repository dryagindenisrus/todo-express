import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { router } from './routes';
import { checkDatabaseConnection } from '@/utils/checkDatabaseConnection';
import { swaggerConfig } from './config/swagger';
import { corsConfig } from './config/cors';
import cookieParser from 'cookie-parser';

// Load environment variables from .env file
dotenv.config();

// Init server components
const app: Application = express();
const port = process.env.PORT || 8000;

// Middleware для обработки CORS
app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());

// Swagger
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerConfig.spec, swaggerConfig.options)
);

// Routers
app.use('/api/v1/', router);

// Start server handler
const server = app.listen(port, async () => {
  await checkDatabaseConnection();
  console.log(`Server is running at http://localhost:${port}`);
});

// Shutdown server handler
['SIGTERM', 'SIGINT'].forEach((signal) => {
  process.on(signal, () => {
    console.log(`Received ${signal}, shutting down gracefully.`);
    server.close(() => {
      console.log('Closed out remaining connections.');
      process.exit(0);
    });

    setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down.');
      process.exit(1);
    }, 10000);
  });
});
