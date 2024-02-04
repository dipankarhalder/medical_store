import http from 'http';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import router from './router';
import { app_config } from './config/env';
import { mongo_success, mongo_error, app_server } from './config/content';

// application
const app = express();
const { MONGOPATH, PORT } = app_config;

// mongo database
mongoose.Promise = Promise;
mongoose.connect(MONGOPATH);
mongoose.connection.on('error', (error) => console.error(mongo_error, error));
mongoose.connection.once('open', () => console.log(mongo_success));

app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/', router());

const server = http.createServer(app);
server.listen(PORT, () => console.log(`${app_server} ${PORT}`));