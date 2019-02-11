import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import config from './config';
import api from './api';

const { corsHeaders: exposedHeaders, bodyLimit, errorStatus } = config;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ exposedHeaders }));
app.use(bodyParser.json({
	limit : `${process.env.BODY_LIMIT || bodyLimit}kb`
}));
app.use('/api', api());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || errorStatus).send({
    status: err.status,
    error: err
  });
});

export default app;
