import express from 'express';
import pool from './utils/lib/pg';
import cors from 'cors';
import { apiPort } from './utils/functions/config';

import handlerResponse from './middlewares/handlerResponse';
import handlerRequest from './middlewares/handlerRequest';
import handlerError from './middlewares/handlerError';

import personRoutes from './routes/person';

//database
pool.connect((err) => {
  if (err) {
    console.log(`Failed to connect db`, err.stack);
    return process.exit(1);
  }
  console.log('Successful database connection');
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(handlerRequest);

//enrutamiento
app.use('/person', personRoutes);

app.use(handlerError);
app.use(handlerResponse);
app.listen(apiPort, () => {
  console.log(`🚀API listening port ${apiPort}`);
});
