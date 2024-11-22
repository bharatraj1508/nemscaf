const fs = require("fs");
const path = require("path");

const createModel = (dirPath, model) => {
  const fullPath = path.join(dirPath, "src/models");

  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }

  const sourceFilePath = path.join(__dirname, "files", "models", `${model}.js`);

  let contentToWrite;
  try {
    contentToWrite = fs.readFileSync(sourceFilePath, "utf8");
  } catch (error) {
    console.error(`Error reading source file: ${error.message}`);
    process.exit(1);
  }

  // Write the content to index.js
  const filePath = path.join(dirPath, "src", "models", "user.js");
  fs.writeFileSync(filePath, contentToWrite.trim(), { flag: "w" });
};

module.exports = { createModel };
