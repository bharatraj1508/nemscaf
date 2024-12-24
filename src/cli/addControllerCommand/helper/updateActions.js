const {
  getControllerActions,
} = require("../../addRoutesCommand/helper/controllerActions");

const updateActions = (formattedControllerName, controllerFileLoc, actions) => {
  const definedActionsObj = {
    ":create": `create${formattedControllerName}`,
    ":show": `single${formattedControllerName}`,
    ":index": `all${formattedControllerName}`,
    ":update": `update${formattedControllerName}`,
    ":destroy": `destory${formattedControllerName}`,
  };

  const existingControllerActionsFn = getControllerActions(controllerFileLoc);

  const existingActions = [];

  existingControllerActionsFn.forEach((a) => {
    const correspondingKey = Object.keys(definedActionsObj).find(
      (key) => definedActionsObj[key] === a
    );

    existingActions.push(correspondingKey);
  });

  return [...new Set([...existingActions, ...actions])];
};

module.exports = { updateActions };
