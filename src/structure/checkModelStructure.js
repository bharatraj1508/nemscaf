const fs = require("fs");

const checkModelStruct = () => {
  const projectStruct = ["src", "src/models", "index.js"];
  projectStruct.forEach((path) => {
    if (!fs.existsSync(path)) {
      console.error(
        `Error: Missing required structure. Make sure to run the 'create' command first to set up the project.`
      );
      process.exit(1);
    }
  });
};

module.exports = { checkModelStruct };
