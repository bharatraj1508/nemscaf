const fs = require("fs");
const path = require("path");
const { createController } = require("./helper/createController");
const { getRouteTemplate } = require("./helper/getRouteTemplate");
const { createRouteFile } = require("./helper/createRouteFile");
const { modifyIndexFile } = require("./helper/modifyIndexFile");

const addRoutes = (controllerName, endpoints) => {
  const formattedControllerName =
    controllerName.charAt(0).toUpperCase() + controllerName.slice(1);

  const definedActions = [":index", ":show", ":create", ":update", ":destroy"];

  endpoints.forEach((a) => {
    if (!definedActions.includes(a)) {
      console.log(
        `\x1b[31m'${a}' is not a valid action. Please specify actions out of ${definedActions.join(", ")}`
      );
      process.exit(1);
    }
  });

  const currDirec = process.cwd();
  const controllerFileLoc = path.join(
    currDirec,
    "src/controllers",
    `${formattedControllerName.toLowerCase()}Controller.js`
  );

  if (!fs.existsSync(controllerFileLoc)) {
    createController(controllerName, endpoints);
  }

  const template = getRouteTemplate(
    formattedControllerName,
    controllerFileLoc,
    endpoints
  );

  createRouteFile(formattedControllerName, template);

  modifyIndexFile(controllerName.toLowerCase());
};

module.exports = { addRoutes };
