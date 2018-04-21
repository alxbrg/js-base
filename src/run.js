'use strict';

const { spawn } = require('child_process');

module.exports = function (cmd, cwd, args = []) {
  return new Promise(resolve => {
    const child = spawn(cmd, args, { cwd, stdio: 'inherit' });
    child.on('exit', code => { if (code === 0) resolve(); });
  });
};
