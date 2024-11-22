#!/usr/bin/env node

const { Command } = require("commander");
const { createCommand } = require("../src/cli/createCommands");

const program = new Command();

program
  .name("nem")
  .description(
    "A Command Line Interface (CLI) tool to scaffold Node.js, Express, and MongoDB projects with customizable boilerplate code for authentication and validation."
  )
  .version("1.0.0");

program
  .command("create")
  .description(
    "Generate a new project with Node.js, Express, and MongoDB. Customize the project setup with additional options for authentication and validation."
  )
  .argument("<dirName>", "Specify the name of the project to create")
  .option("--passport", "Integrate PassportJS for user authentication")
  .option("--joi", "Include Joi for request data validation")
  .action((dirName, options, cmd) => {
    // Ensure no options appear before the <dirName>
    const rawArgs = cmd.parent.rawArgs;
    const commandIndex = rawArgs.indexOf("create");
    const dirNameIndex = commandIndex + 1;

    if (rawArgs[dirNameIndex]?.startsWith("--")) {
      console.error(
        "\nError: Please specify the project name before any options.\n"
      );
      process.exit(1);
    }

    createCommand(dirName, options);
  });

program.parse(process.argv);
