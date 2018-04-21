'use strict';

const winston = require('winston');

const {
  createLogger,
  format,
  transports,
} = winston;

const {
  colorize,
  combine,
  printf,
} = format;

const levels = {
  levels: {
    error: 0,
    success: 1,
    warn: 2,
    info: 3,
  },
  colors: {
    error: 'red',
    success: 'green',
    warn: 'yellow',
    info: 'grey',
  },
};

winston.addColors(levels.colors);

module.exports = createLogger({
  format: combine(
    colorize(),
    printf(({ level, message }) => `${level} ${message}`)
  ),

  level: 'info',

  levels: levels.levels,

  transports: [new transports.Console()],
});
