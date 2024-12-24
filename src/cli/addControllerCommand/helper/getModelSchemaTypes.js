const fs = require("fs");
const path = require("path");

const modelSchemaTypes = async (formattedControllerName) => {
  const currDirec = process.cwd();

  const mongoose = require(path.join(currDirec, "node_modules/mongoose"));

  const modelFileLoc = path.join(
    currDirec,
    "src/models",
    `${formattedControllerName}.js`
  );

  if (!fs.existsSync(modelFileLoc)) {
    console.log(
      `\x1b[31mThe model for the specified controller '${formattedControllerName}' was not found. ` +
        `If the model exists, please specify the correct name or create a new model file ` +
        `using the command: \x1b[33m"nemscaf add model --help"\x1b[0m.`
    );

    process.exit(1);
  }
  // Dynamically require the model file to register it with Mongoose
  require(modelFileLoc);

  // Access the model from Mongoose's registry
  const Model = mongoose.models[formattedControllerName];

  // Get schema types
  const schemaTypes = {};
  Object.keys(Model.schema.paths).forEach((field) => {
    schemaTypes[field] = Model.schema.paths[field].instance; // Get the field type
  });

  return schemaTypes;
};

module.exports = { modelSchemaTypes };
