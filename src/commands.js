'use strict';

const fs = require('fs');

const clone = require('./clone');
const logger = require('./logger');
const run = require('./run');

function help () {
  const out = `\
usage:
  js-base [options] [project_name] Init in ./project_name, else use current dir

options:
  -f, --force                 Override existing files in target directory
  -t, --template [<template>] Select a template (defaults to node)

templates:
  library   Base for a library aimed at both node and browsers environments
  node      (default) Base for a node project
  webpack   Simple Webpack setup.\
`;

  console.log(out);
}

async function init ({
  dest,
  projectName,
  source,
  templateName,
} = {}) {
  const yarn = args => run('yarn', dest, args);

  logger.info(`Setting up '${projectName}' ${templateName} project base...`);

  // mkdir if destination doesn't exist
  if (!fs.existsSync(dest)) fs.mkdirSync(projectName);

  // Run git init
  if (!fs.existsSync(`${dest}/.git`)) await run('git', dest, ['init']);

  // Run yarn init
  await yarn(['init']);

  // Clone template dir
  logger.info('Cloning base...');
  clone(source, dest, projectName);

  // Install template dependencies
  logger.info('Installing dependencies...');
  await yarn();

  logger.success('Created project base.');
}

module.exports = {
  help,
  init,
};
