const prettier = require("prettier");
const fs = require("fs");
const path = require("path");

const {
  controllerTemplate,
} = require("../../../fs/files/controllers/controllerTemplate");

const createControllerFile = async (
  controllerName,
  actionDefinition,
  actionExports
) => {
  try {
    const formattedTemplate = await prettier.format(
      controllerTemplate(controllerName, actionDefinition, actionExports),
      {
        parser: "babel",
        semi: true,
        singleQuote: true,
      }
    );

    const currentDir = process.cwd();

    try {
      const filePath = path.join(
        currentDir,
        "src/controllers",
        `${controllerName.toLowerCase()}Controller.js`
      );

      if (fs.existsSync(filePath)) {
        console.log("\x1b[31mError: Already existed");
        process.exit(1);
      }

      fs.writeFileSync(filePath, formattedTemplate.trim(), { flag: "w" });
      console.log(`\x1b[32mcreated - ${filePath}`);
    } catch (error) {
      console.log(`\x1b[31mError processing file : ${error.message}`);
      process.exit(1);
    }
  } catch (error) {
    console.error("Error processing model file:", error.message);
    process.exit(1);
  }
};

module.exports = { createControllerFile };
