'use strict';

const argv = require('minimist')(process.argv.slice(2));

const commands = require('./commands');
const parseArgs = require('./argv');
const logger = require('./logger');

module.exports = async function () {
  process.on('uncaughtException', logger.error.bind(logger));
  process.on('unhandledRejection', logger.error.bind(logger));

  const { command, options } = parseArgs(argv);

  commands[command](options);
};
