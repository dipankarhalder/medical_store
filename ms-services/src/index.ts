import http from 'http';
import cors from 'cors';
import logger from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import router from './router';
import { app_config } from './config/env';
import { 
  mongo_success, 
  mongo_error, 
  app_server 
} from './config/content';

// application
const app = express();
const { 
  MONGOPATH, 
  PORT 
} = app_config;

// mongodb database
mongoose.Promise = Promise;
mongoose.connect(MONGOPATH);
mongoose.connection.on('error', 
  (error) => console.error(mongo_error, error)
);
mongoose.connection.once('open', 
  () => console.log(mongo_success)
);

app.use(cors({ origin: "*", }))
  .use(logger(':method, :url, :status, :response-time, :total-time ms'))
  .use(compression())
  .use(cookieParser())
  .use(express.json())
  .use('/', router());

  // app listener
const server = http.createServer(app);
server.listen(PORT, () => console.log(`${app_server} ${PORT}`));