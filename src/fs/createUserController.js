const fs = require("fs");
const path = require("path");

const createUserController = (dirPath) => {
  // Define files to copy and their target paths
  const userControllerFile = path.join(
    __dirname,
    "files",
    "controllers",
    "userController.js"
  );

  // Read and write files
  try {
    const contentToWrite = fs.readFileSync(userControllerFile, "utf8");
    const filePath = path.join(dirPath, "src/controllers", "userController.js");

    fs.writeFileSync(filePath, contentToWrite.trim(), { flag: "w" });
  } catch (error) {
    console.error(`Error processing file userController: ${error.message}`);
  }
};

module.exports = { createUserController };
