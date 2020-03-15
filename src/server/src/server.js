import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import auth from './utils/auth';

import listRouter from './resources/list/list.router';
import itemRouter from './resources/item/item.router';
import config from './config';

export const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(auth);

app.get('/', (req, res) => {
  res.send({ message: 'Hello World' });
});

app.use('/list', listRouter);
app.use('/item', itemRouter);

export const start = () => {
  console.log('=====================================');
  console.log(' Server started on Port ' + config.port);
  console.log('=====================================');
  app.listen(config.port);
};
