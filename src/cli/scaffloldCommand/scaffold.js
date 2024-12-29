const { executeCommand } = require("../../utils/execCommand");

const createModel = (modelName, attributes) => {
  const command = `nemscaf add model ${modelName} ${attributes.join(" ")}`;

  executeCommand(command, (stdout) => {
    if (stdout) console.log(stdout);
  });
};

const createController = (modelName) => {
  const command = `nemscaf add controller ${modelName} :create :show :index :update :destroy`;

  executeCommand(command, (stdout) => {
    if (stdout) console.log(stdout);
  });
};

const createRoutes = (modelName) => {
  const command = `nemscaf add routes ${modelName}`;

  executeCommand(command, (stdout) => {
    if (stdout) console.log(stdout);
  });
};

const scaffold = (modelName, attributes) => {
  createModel(modelName, attributes);
  createController(modelName);
  createRoutes(modelName);
};

module.exports = { scaffold };
