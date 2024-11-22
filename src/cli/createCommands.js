const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");
const { fetchPackages } = require("../dependencies/execDependency");
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
  fetchPackages(dirPath, dirName, options)
    .then(() => {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      console.log("packages fetched successfully... \x1b[32m✔\x1b[0m"); // Success message with a green tick

      // Create project structure
      console.log("Creating project structure...");
      createStructure(dirPath, logTaskProgress, options);

      // Read and write content from a template file (source file) to index.js
      createIndex(dirPath);

      // Create `.env` file
      createDotEnvFile(dirPath);

      //creating README.md
      const readmeTemplatePath = path.join(
        __dirname,
        "..",
        "fs",
        "files",
        "project_README.md"
      );

      let readmeContent = fs.readFileSync(readmeTemplatePath, "utf-8");
      readmeContent = readmeContent.replace("{{ PROJECT_NAME }}", dirName);

      const filePath = path.join(dirPath, "README.md");

      fs.writeFileSync(filePath, readmeContent.trim(), { flag: "w" });

      //initializing git
      console.log("\ngit initialization...\n");
      execSync("git init", { stdio: "ignore" });
      execSync("npx gitignore node", { stdio: "inherit" });

      logCompletion(dirName);
    })
    .catch(console.error);
};

module.exports = { createCommand };
