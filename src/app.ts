import cors from 'cors';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import express, { Application } from 'express';

import { corsConfig } from '@/config/cors';
import { router } from '@/routes';
import { swaggerConfig } from '@/config/swagger';
import { appConfig } from '@/config/app';

const app: Application = express();

app.use(cors(corsConfig));

app.use(express.json());

app.use(cookieParser());

if (appConfig.swagger) {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerConfig.spec, swaggerConfig.options)
  );
}

app.get('/', async (request, response) => {
  response.status(httpStatus.OK).send('Ok');
});

app.use('/api/v1/', router);

app.use((_, res) => {
  res.status(httpStatus.NOT_FOUND).send('Not Found');
});

// app.use(errorHandler);

export { app };
