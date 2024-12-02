const prettier = require("prettier");

const modelTemplate = async (modelName, schemaDefinition) => {
  const schemaString = Object.entries(schemaDefinition)
    .map(
      ([att, value]) => `
    ${att}: {
      type: ${value.type}
    }`
    )
    .join(",\n");

  const template = `const mongoose = require("mongoose");

const ${modelName}Schema = new mongoose.Schema({
  ${schemaString}
});

mongoose.model("${modelName}", ${modelName}Schema);
`;

  try {
    const formattedTemplate = await prettier.format(template, {
      parser: "babel",
      semi: true,
      singleQuote: true,
    });

    return formattedTemplate;
  } catch (error) {
    console.error("Error processing model file:", error.message);
    return null;
  }
};

module.exports = { modelTemplate };
