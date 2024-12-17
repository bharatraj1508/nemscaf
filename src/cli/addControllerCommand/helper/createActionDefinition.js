const createActionDefinition = async (actions, controllerName) => {
  const actionDefinition = [];
  const actionExports = [];

  actions.forEach((r) => {
    const action = r.replace(":", "");

    switch (action) {
      case "index":
        actionDefinition.push(
          `const all${controllerName} = async(req, res) => {
            // add controller definition here
            }`
        );
        actionExports.push(`all${controllerName}`);
        break;

      case "show":
        actionDefinition.push(
          `const single${controllerName} = async(req, res) => {
            // add controller definition here
            }`
        );
        actionExports.push(`single${controllerName}`);
        break;

      case "create":
        actionDefinition.push(
          `const create${controllerName} = async(req, res) => {
            // add controller definition here
            }`
        );
        actionExports.push(`create${controllerName}`);
        break;

      case "update":
        actionDefinition.push(
          `const update${controllerName} = async(req, res) => {
            // add controller definition here
            }`
        );
        actionExports.push(`update${controllerName}`);
        break;

      case "destroy":
        actionDefinition.push(
          `const destroy${controllerName} = async(req, res) => {
            // add controller definition here
            }`
        );
        actionExports.push(`destroy${controllerName}`);
        break;
    }
  });

  return { actionDefinition, actionExports };
};

module.exports = { createActionDefinition };
