import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import { exceptionHandler } from './middlewares/exceptionHandler';
import './database';
import './shared/container';
import { router } from './routes';
import swaggerDocument from './swagger.json';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(router);
app.use(exceptionHandler);

app.listen(3333, () => console.log('server is running! 🚀'));
