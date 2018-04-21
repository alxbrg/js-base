'use strict';

const {
  createLogger,
  format,
  transports,
} = require('winston');

const {
  colorize,
  combine,
  json,
  printf,
  timestamp,
} = format;

const {
  NODE_ENV,
} = process.env;


const logger = createLogger({
  level: 'info',

  format: combine(...NODE_ENV === 'production'
    ? [ (timestamp(), json()) ]
    : [ colorize(), printf(({ level, message }) => `${level} ${message}`) ]),

  transports: NODE_ENV === 'production'
    ? [ new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'info.log' }) ]
    : [ new transports.Console() ],
});

module.exports = {
  logger,
};
