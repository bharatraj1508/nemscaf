const { getControllerActions } = require("./controllerActions");
const {
  getControllerTemplate,
} = require("../../../fs/files/routes/routeTemplate");
const { createController } = require("./createController");

const getRouteTemplate = (
  formattedControllerName,
  controllerFileLoc,
  endpoints
) => {
  const definedActions = {
    ":create": `create${formattedControllerName}`,
    ":show": `single${formattedControllerName}`,
    ":index": `all${formattedControllerName}`,
    ":update": `update${formattedControllerName}`,
    ":destroy": `destroy${formattedControllerName}`,
  };

  const existingActionsFn = getControllerActions(controllerFileLoc);

  const newActionsFn = [];
  const newActions = [];

  endpoints.forEach((item) => {
    if (!existingActionsFn.includes(definedActions[item])) {
      newActions.push(item);
    }

    newActionsFn.push(definedActions[item]);
  });

  const actions = [...new Set([...newActionsFn, ...existingActionsFn])];

  if (newActions.length !== 0) {
    createController(formattedControllerName, newActions);
  }

  return getControllerTemplate(
    formattedControllerName,
    actions,
    definedActions
  );
};

module.exports = { getRouteTemplate };
