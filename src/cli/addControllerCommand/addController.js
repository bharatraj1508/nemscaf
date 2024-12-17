const fs = require("fs");
const { promptQuestion } = require("./helper/promptQuestion");
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

  const modelLocation = `src/models/${formattedControllerName}.js`;

  if (!fs.existsSync(modelLocation)) {
    console.log(
      "\x1b[31mModel not found for the specified controller. If the model exists please specify its correct name."
    );

    promptQuestion(
      controllerName.charAt(0).toUpperCase() + controllerName.slice(1)
    );
  }

  const { actionDefinition, actionExports } = await createActionDefinition(
    actions,
    formattedControllerName
  );

  await createControllerFile(controllerName, actionDefinition, actionExports);
};

module.exports = { addController };
