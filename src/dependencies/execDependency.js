const { execSync } = require("child_process");

const commands = require("./commandList");

const installPackages = () => {
  try {
    console.log("Installing dependencies...");
    commands.forEach((cmd) => {
      console.log(cmd.desc);
      try {
        execSync(cmd.command, { stdio: "inherit" });
      } catch (error) {
        throw new Error(`Error executing command: ${error.message}`);
      }
    });
    console.log("\nAll dependencies installed.");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { installPackages };
