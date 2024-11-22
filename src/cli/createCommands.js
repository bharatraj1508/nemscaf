const path = require("path");
const fs = require("fs");
const { installPackages } = require("../dependencies/execDependency");
const { createIndex, createDotEnvFile } = require("../fs/createIndex");
const { createStructure } = require("../structure/createStructure");
const { logTaskProgress, logCompletion } = require("../utils/logger");

const createCommand = (dirName, options) => {
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

  // Install dependencies
  installPackages(options);

  // Create project structure
  console.log("Creating project structure");
  createStructure(dirPath, logTaskProgress, options);

  // Read and write content from a template file (source file) to index.js
  createIndex(dirPath);

  // Create `.env` file
  createDotEnvFile(dirPath);

  logCompletion(dirName);
};

module.exports = { createCommand };
