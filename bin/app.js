#!/usr/bin/env node

const { Command } = require("commander");
const { createCommand } = require("../src/cli/createCommands");

const program = new Command();

program
  .name("nem")
  .description(
    "CLI to create a Node.js, Express, MongoDB project with boilerplate code"
  )
  .version("1.0.0");

program
  .command("create <dirName>")
  .description("Create a new project with Node.js, Express, and MongoDB")
  .action(createCommand);

// Parse the command-line arguments
program.parse(process.argv);
