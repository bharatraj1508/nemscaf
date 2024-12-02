const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { createModelFile } = require("../fs/createModelFile");

const addModel = async (modelName, attributes) => {
  var schemaDefinition = {};

  const MongooseSchema = Object.keys(Schema.Types);

  attributes.forEach((attr) => {
    if (!attr.includes(":")) {
      console.error(
        `Invalid attribute format: '${attr}'. Expected a valid attribute:type pair, but no type was provided.`
      );
    } else {
      const [key, type] = attr.split(":");
      if (MongooseSchema.includes(type)) {
        schemaDefinition[key] = {
          type: type,
        };
      } else {
        schemaDefinition = {};
        return console.log(`Invalid Schema Type: ${type}`);
      }
    }
  });

  // creating the model file and write in its location src/models/modelName.js
  createModelFile(
    modelName.charAt(0).toUpperCase() + modelName.slice(1),
    schemaDefinition
  );
};

module.exports = { addModel };
