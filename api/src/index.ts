import express from 'express';
import cors from 'cors';
import { apiPort } from './utils/functions/config';

import handlerResponse from './middlewares/handlerResponse';
import handlerRequest from './middlewares/handlerRequest';
import handlerError from './middlewares/handlerError';

const app = express();

app.use(express.json());
app.use(cors());
app.use(handlerRequest);

//enrutamiento
//app.use('/country', countryRoutes);

app.use(handlerError);
app.use(handlerResponse);
app.listen(apiPort, () => {
  console.log(`🚀API listening port ${apiPort}`);
});
