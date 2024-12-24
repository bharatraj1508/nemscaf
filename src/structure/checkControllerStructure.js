const fs = require("fs");

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

module.exports = { checkControllerStruct };
