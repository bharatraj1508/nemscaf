const controllerTemplate = (
  controllerName,
  actionDefinition,
  actionExports
) => {
  return `const mongoose = require("mongoose");
const ${controllerName} = mongoose.model("${controllerName}");

${actionDefinition.join("\n")}

module.exports = {
  ${actionExports.join(",\n")}
};
`;
};

module.exports = { controllerTemplate };
