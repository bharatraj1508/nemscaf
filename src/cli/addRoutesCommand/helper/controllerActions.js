const fs = require("fs");

const getControllerActions = (controllerFileLoc) => {
  try {
    const controllerFileContent = fs.readFileSync(controllerFileLoc, "utf8");

    const exportPattern = /module\.exports\s*=\s*{([\s\S]*?)}/;
    const match = controllerFileContent.match(exportPattern);

    if (!match) {
      console.log("\x1b[33mNo actions found in module.exports.\x1b[0m");
      return [];
    }

    const exportsContent = match[1];

    return exportsContent.match(/\b\w+\b/g);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = { getControllerActions };
