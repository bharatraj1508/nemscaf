const logTaskProgress = (task, dirPath) => {
  process.stdout.write(`\t${task.index}. ${task.desc}... ⏳\x1b[?25l`);
  try {
    task.fn(dirPath);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log(`\t${task.index}. ${task.desc}... \x1b[32m✔\x1b[0m`);
  } catch (error) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.error(
      `\t${task.index}. ${task.desc}... \x1b[31mFailed: ${error.message}\x1b[0m`
    );
  }
};

const logCompletion = (dirName) => {
  console.log(
    `\n\x1b[?25hProject structure created successfully.\x1b[32m✔\x1b[0m\n`
  );
  console.log("\x1b[32m\nSetup complete!\n\x1b[0m");
  console.log("Things to do:\n");
  console.log(`\t1. cd ${dirName}`);
  console.log("\t2. npm install");
  console.log("\t3. Add your MongoDB URI to .env file");
  console.log("\t4. nodemon index.js\n");
};

module.exports = { logTaskProgress, logCompletion };
