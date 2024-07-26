import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from './routes';

// Load environment variables from .env file
dotenv.config();

// Init server components
const app: Application = express();
const port = process.env.PORT || 8000;

// Middleware для обработки CORS
app.use(cors());
app.use(express.json());

// Routers
app.use('/api/v1/', router);

// Start server handler
const server = app.listen(port, async () => {
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
