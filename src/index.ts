import { checkDatabaseConnection } from '@/utils/checkDatabaseConnection';
import { appConfig } from '@/config/app';
import { app } from './app';

const port = appConfig.port;

const server = app.listen(port, async () => {
  await checkDatabaseConnection();
  console.log(`Server is running at: http://localhost:${port}`);
});

['SIGTERM', 'SIGINT'].forEach((signal) => {
  process.on(signal, () => {
    console.log(`Received ${signal}, shutting down gracefully.`);
    server.close(() => {
      console.log('Closed out remaining connections.');
      process.exit(0);
    });

    console.error('Could not close connections in time, forcefully shutting down.');
    process.exit(1);
  });
});
