const fs = require("fs");
const path = require("path");

const updateIndexFile = (modelName) => {
  try {
    const currentDir = process.cwd();
    const indexFilePath = path.join(currentDir, "index.js");

    const oldIndexFile = fs.readFileSync(indexFilePath, "utf-8");

    let indexFileArray = oldIndexFile.split("\n");

    const location = indexFileArray.indexOf('require("./src/models/user");');

    if (
      indexFileArray.includes(
        `require("./src/models/${modelName.toLowerCase()}");`
      )
    ) {
      return;
    }

    indexFileArray.splice(
      location + 1,
      0,
      `require("./src/models/${modelName.toLowerCase()}");`
    );

    const updatedIndexFile = indexFileArray.join("\n");
    fs.writeFileSync(indexFilePath, updatedIndexFile.trim(), { flag: "w" });
    console.log(`\x1b[33mmodified - ${indexFilePath}`);
  } catch (error) {
    console.error(`Failed to update index.js: ${error.message}`);
  }
};

module.exports = { updateIndexFile };
