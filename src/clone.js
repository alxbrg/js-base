'use strict';

const fs = require('fs');
const { ncp } = require('ncp');

module.exports = function (source, dest, name) {
  const templatePackage = JSON.parse(fs.readFileSync(`${source}/package.json`));
  // Use a default init package if yarn init was skipped
  const initPackagePath = `${dest}/package.json`;
  const initPackage = fs.existsSync(initPackagePath)
    ? JSON.parse(fs.readFileSync(initPackagePath))
    : {
      name,
      version: '1.0.0',
      license: 'MIT',
    };

  // Copy template directory
  ncp(source, dest, async err => {
    if (err) throw new Error(new Error(err));

    // Fixes an NPM issue with .gitignore files
    // see: https://github.com/npm/npm/issues/3763
    fs.renameSync(`${dest}/gitignore`, `${dest}/.gitignore`);

    // Merge init and template packages
    const newPackage = { ...initPackage, ...templatePackage };

    fs.writeFile(
      `${dest}/package.json`,
      JSON.stringify(newPackage, null, 2),
      async _err => { if (_err) throw new Error(err); },
    );
  });
};
