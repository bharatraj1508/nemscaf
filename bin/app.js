#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { Command } = require("commander");
const { installPackages } = require("../src/dependencies/execDependency");
const { createIndex } = require("../src/files/createIndex");

const program = new Command();

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

    // Read and write content from a template file (source file) to index.js
    createIndex(dirPath);

    console.log("\nSetup complete!\n");
    console.log(`\ncd ${dirName}`);
    console.log(`npm install\n`);
  });

// Parse the command-line arguments
program.parse(process.argv);
