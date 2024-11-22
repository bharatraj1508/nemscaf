const { execSync } = require("child_process");
const commands = require("./commandList");

const installPackages = async (options) => {
  if (options.passport) {
    commands.push(
      {
        command: "npm install passport",
        desc: "installing passport js for authentication",
      },
      {
        command: "npm install passport-jwt",
        desc: "installing passport jwt strategy",
      }
    );
  }
  if (options.joi) {
    commands.push({
      command: "npm install joi",
      desc: "installing joi for user validations",
    });
  }

  try {
    console.log("Installing dependencies...\n");

    for (let i = 0; i < commands.length; i++) {
      const { command, desc } = commands[i];

      // Display the current task with a spinner
      process.stdout.write(`\t${i + 1}. ${desc}... ⏳\x1b[?25l`);

      try {
        execSync(command, { stdio: "ignore" });

        // Replace spinner with a green tick
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        console.log(`\t${i + 1}. ${desc}... \x1b[32m✔\x1b[0m`); // Success message with a green tick
      } catch (error) {
        // Replace spinner with a red cross on failure
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        console.error(`\t${i + 1}. ${desc}... \x1b[31m✘\x1b[0m`);
        throw new Error(
          `Failed to execute "${command}": ${error.message}\x1b[?25h`
        );
      }
    }

    console.log("\nAll dependencies installed successfully.\x1b[?25h\n");
  } catch (error) {
    console.error(`\nError: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { installPackages };
