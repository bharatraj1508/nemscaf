const path = require("path");
const { executeCommand } = require("../../../utils/execCommand");

const createController = (controllerName, endpoints) => {
  if (endpoints.length === 0) {
    endpoints = [":create", ":show", ":index", ":update", ":destroy"];
  }

  executeCommand(
    `nemscaf add controller ${controllerName} ${endpoints.join(" ")}`,
    (stdout) => {
      console.log(stdout);
    }
  );
};

module.exports = { createController };
