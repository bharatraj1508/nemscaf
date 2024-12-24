const getControllerTemplate = (controllerName, actions, definedActions) => {
  const routes = [];

  actions.forEach((a) => {
    switch (a) {
      case definedActions[":create"]:
        routes.push(`router.post("/", ${definedActions[":create"]});`);
        break;

      case definedActions[":show"]:
        routes.push(`router.post("/:id", ${definedActions[":show"]});`);
        break;

      case definedActions[":index"]:
        routes.push(`router.post("/", ${definedActions[":index"]});`);
        break;

      case definedActions[":update"]:
        routes.push(`router.post("/:id", ${definedActions[":update"]});`);
        break;

      case definedActions[":destroy"]:
        routes.push(`router.post("/:id", ${definedActions[":destroy"]});`);
        break;
    }
  });

  return `const express = require("express");

const router = express.Router();

const { ${actions.join(", ")} } = require("../controllers/${controllerName.toLowerCase()}Controller");

${routes.join("\n")}

module.exports = router;`;
};

module.exports = { getControllerTemplate };
