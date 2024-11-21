const fs = require("fs");
const path = require("path");

const createIndex = (dirPath) => {
  const sourceFilePath = path.join(__dirname, "..", "..", "index.js");
  let contentToWrite;
  try {
    contentToWrite = fs.readFileSync(sourceFilePath, "utf8");
    console.log("\nInitializing index.js template.");
  } catch (error) {
    console.error(`Error reading source file: ${error.message}`);
    process.exit(1);
  }

  // Write the content to index.js
  const filePath = path.join(dirPath, "index.js");
  fs.writeFileSync(filePath, contentToWrite.trim(), { flag: "w" });
  console.log('File "index.js" created.\n');
};

module.exports = { createIndex };
