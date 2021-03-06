import express from 'express';
import 'dotenv/config';

import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import { exceptionHandler } from '@middlewares/exceptionHandler';

import './database';
import '@shared/container';
import '@shared/container/providers';
import upload from '@config/upload';

import { createConnection } from 'typeorm';

import { router } from './routes';
import swaggerDocument from './swagger.json';

createConnection();

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(router);
app.use(exceptionHandler);

export { app };
