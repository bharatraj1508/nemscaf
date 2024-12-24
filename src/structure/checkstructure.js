const fs = require("fs");

const checkModelStruct = () => {
  const projectStruct = ["src", "src/models", "index.js"];
  projectStruct.forEach((path) => {
    if (!fs.existsSync(path)) {
      console.error(
        `\x1b[31mError: Missing required structure. Make sure to run the 'create' command first to set up the project.`
      );
      process.exit(1);
    }
  });
};

const checkControllerStruct = () => {
  const projectStruct = ["src", "src/controllers"];
  projectStruct.forEach((path) => {
    if (!fs.existsSync(path)) {
      console.error(
        `\x1b[31mError: Missing required structure. Make sure to run the 'create' command first to set up the project.`
      );
      process.exit(1);
    }
  });
};

const checkRoutesStruct = () => {
  const projectStruct = ["src", "src/routes"];
  projectStruct.forEach((path) => {
    if (!fs.existsSync(path)) {
      console.error(
        `\x1b[31mError: Missing required structure. Make sure to run the 'create' command first to set up the project.`
      );
      process.exit(1);
    }
  });
};

module.exports = { checkModelStruct, checkControllerStruct, checkRoutesStruct };
