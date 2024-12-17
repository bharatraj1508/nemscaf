const { exec } = require("child_process");

const executeCommand = (command, callback) => {
  exec(command, (err, stdout) => {
    if (err) {
      console.error(`\x1b[31mError: ${err.message}\x1b[0m`);
      console.error(`\x1b[31mDetails: ${stderr}\x1b[0m`);
      process.exit(1);
    }
    callback(stdout);
  });
};

module.exports = { executeCommand };
