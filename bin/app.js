#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { Command } = require("commander");
const { installPackages } = require("../src/dependencies/execDependency");
const { createIndex, createDotEnvFile } = require("../src/fs/createIndex");
const { createModel } = require("../src/fs/createModels");
const { createAuthentication } = require("../src/fs/createAuth");
const program = new Command();

const createProjectStructure = [
  {
    index: 1,
    name: "models",
    fn: createModel,
    desc: "creating models",
  },
  {
    index: 2,
    name: "auth",
    fn: createAuthentication,
    desc: "creating authentication routes and controller",
  },
];

program
  .name("nem")
  .description(
    "CLI to create a Node.js, Express, MongoDB project with boilerplate code"
  )
  .version("1.0.0");

program
  .command("create <dirName>")
  .description("Create a new project with node, express, mongodb with defaults")
  .action((dirName) => {
    const currentDir = process.cwd();
    const dirPath = path.join(currentDir, dirName);

    // Check if the directory already exists
    if (fs.existsSync(dirPath)) {
      console.log(`Directory "${dirName}" already exists.`);
      return;
    }

    // Create the directory
    fs.mkdirSync(dirPath);
    console.log(`Project "${dirName}" initiated.`);

    // Change to the newly created directory
    process.chdir(dirPath);

    //installing the dependecies
    installPackages();

    //creating Project structure
    console.log("Creating project structure");
    createProjectStructure.forEach((item) => {
      process.stdout.write(`\t${item.index}. ${item.desc}... ⏳\x1b[?25l`);
      switch (item.name) {
        case "models":
          item.fn(dirPath, "user");
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
          console.log(`\t${item.index}. ${item.desc}... \x1b[32m✔\x1b[0m`);
          break;
        case "auth":
          item.fn(dirPath);
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
          console.log(`\t${item.index}. ${item.desc}... \x1b[32m✔\x1b[0m`);
          break;
      }
    });
    console.log(
      `\n\x1b[?25hProject structure created successfully.\x1b[32m✔\x1b[0m\n`
    );

    // Read and write content from a template file (source file) to index.js
    createIndex(dirPath);

    //creating  .env file
    createDotEnvFile(dirPath);

    console.log("\x1b[32m\nSetup complete!\n\x1b[0m");
    console.log("Things to do:\n");
    console.log("\t1. cd " + dirName);
    console.log("\t2. npm install");
    console.log("\t3. Add your MongoDB URI to .env file");
    console.log("\t4. nodemon index.js\n");
  });

// Parse the command-line arguments
program.parse(process.argv);
