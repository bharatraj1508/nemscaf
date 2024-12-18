const { modelSchemaTypes } = require("./helper/getModelSchemaTypes");
const { createActionDefinition } = require("./helper/createActionDefinition");
const { createControllerFile } = require("./helper/createControllerFile");

const addController = async (controllerName, actions) => {
  const formattedControllerName =
    controllerName.charAt(0).toUpperCase() + controllerName.slice(1);

  const definedActions = [":index", ":show", ":create", ":update", ":destroy"];

  actions.forEach((a) => {
    if (!definedActions.includes(a)) {
      console.log(
        `\x1b[31m'${a}' is not a valid action. Please specify actions out of ${definedActions.join(", ")}`
      );
      process.exit(1);
    }
  });

  const schemaTypes = await modelSchemaTypes(formattedControllerName);

  if (Object.keys(schemaTypes).length === 2) {
    console.log(
      `\x1b[31mThe '${formattedControllerName}' model lacks schema type definitions. ` +
        `Please define the necessary schema types before proceeding with controller creation.`
    );
    process.exit(1);
  }

  const { actionDefinition, actionExports } = createActionDefinition(
    actions,
    formattedControllerName,
    schemaTypes
  );

  await createControllerFile(controllerName, actionDefinition, actionExports);
};

module.exports = { addController };
