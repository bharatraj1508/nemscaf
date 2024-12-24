const fs = require("fs");
const path = require("path");
const { modelTemplate } = require("../fs/files/models/modelTemplate");

const createModelFile = (modelName, schemaDefinition) => {
  const currentDir = process.cwd();
  modelTemplate(modelName, schemaDefinition).then((modelFile) => {
    try {
      const filePath = path.join(currentDir, "src/models", `${modelName}.js`);

      if (fs.existsSync(filePath)) {
        console.log("\x1b[31mError: Already existed");
        process.exit(1);
      }

      fs.writeFileSync(filePath, modelFile.trim(), { flag: "w" });
      console.log(`\x1b[32mcreated - ${filePath}`);
    } catch (error) {
      console.log(
        `\x1b[31mError processing file ${modelFile}: ${error.message}`
      );
      process.exit(1);
    }
  });
};

module.exports = { createModelFile };
