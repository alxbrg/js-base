'use strict';

const fs = require('fs');
const path = require('path');

const options = ['_', 'f', 'force', 'h', 'help', 't', 'template'];

module.exports = function (argv) {
  // Reject commands with unknown options
  const unknown = option => !options.includes(option);
  Object.keys(argv).forEach(option => {
    if (unknown(option)) {
      throw new Error(`Unknown option '${option}'. See 'js-base --help'`);
    }
  });

  const {
    _,
    h,
    help,
    f,
    force,
    t,
    template,
  } = argv;

  if (h || help) return { command: 'help' };

  // Reject commands with more than one argument
  if (_.length >= 2) {
    throw new Error(`Unknown argument '${_[1]}'. See 'js-base --help'`);
  }

  // Use provided project name as the project's directory or use working dir
  const dir = _[0];
  const dest = dir ? `./${dir}` : '.';
  const destIsNotEmpty = fs.existsSync(dest) &&
    fs.readdirSync(dest)
      // Ignore .DS_Store on iOS
      .filter(file => file !== '.DS_Store')
      .length;

  // Reject command if directory is not empty
  if (destIsNotEmpty && !(f || force)) {
    throw new Error(`'${dest}' is not an empty directory. To override its \
contents use: '--force'.`);
  }

  // Default to the 'node' template
  const templateName = t || template || 'node';
  const source = path.resolve(__dirname, `../templates/${templateName}`);

  if (!fs.existsSync(source)) {
    throw new Error(`No '${templateName}' template found.`);
  }

  const projectName = dir || path.basename(process.cwd());

  return {
    command: 'init',
    options: {
      dest,
      projectName,
      source,
      templateName,
    },
  };
};
