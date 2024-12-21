const { execSync } = require("child_process");

const executeCommand = (command, callback) => {
  try {
    const stdout = execSync(command, { stdio: "pipe" });
    callback(stdout.toString());
  } catch (err) {
    console.error(`\x1b[31m${err.message}\x1b[0m`);
    process.exit(1);
  }
};

module.exports = { executeCommand };
