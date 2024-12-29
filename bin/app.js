#!/usr/bin/env node

const { Command } = require("commander");
const { createCommand } = require("../src/cli/createCommands");
const { addModel } = require("../src/cli/addModel");
const {
  addController,
} = require("../src/cli/addControllerCommand/addController");
const { addRoutes } = require("../src/cli/addRoutesCommand/addRoutes");
const {
  checkModelStruct,
  checkControllerStruct,
  checkRoutesStruct,
} = require("../src/structure/checkstructure");
const { updateIndexFile } = require("../src/utils/updateIndexFile");
const { scaffold } = require("../src/cli/scaffloldCommand/scaffold");

const program = new Command();

program
  .name("nemscaf")
  .description(
    "A Command Line Interface (CLI) tool to scaffold Node.js, Express, and MongoDB projects with customizable boilerplate code for authentication and validation."
  )
  .version("1.0.0");

program
  .command("create")
  .description(
    "Generate a new project with Node.js, Express, and MongoDB. Customize the project setup with additional options for authentication and validation."
  )
  .argument("<dirName>", "Specify the name of the project to create")
  .option("--passport", "Integrate PassportJS for user authentication")
  .option("--joi", "Include Joi for request data validation")
  .action((dirName, options, cmd) => {
    // Ensure no options appear before the <dirName>
    const rawArgs = cmd.parent.rawArgs;
    const commandIndex = rawArgs.indexOf("create");
    const dirNameIndex = commandIndex + 1;

    if (rawArgs[dirNameIndex]?.startsWith("--")) {
      console.error(
        "\nError: Please specify the project name before any options.\n"
      );
      process.exit(1);
    }

    createCommand(dirName, options);
  });

program
  .command("add")
  .description(
    "Add a new model, controller or routes to the project directory."
  )
  .addCommand(
    new Command("model")
      .description(
        "Add a new model. By default it will create schema with no attributes."
      )
      .argument("<modelName>", "Name of the model to add")
      .argument(
        "[attributes...]",
        "Attributes for the model. [FIELDNAME:TYPE].\nFor example, nemscaf add model Products prodName:String price:Number (optional)"
      )
      .action((modelName, attributes) => {
        checkModelStruct();

        addModel(modelName, attributes)
          .then(() => {
            updateIndexFile(modelName);
          })
          .catch((error) => {
            console.log(
              `\x1b[31mError: Something went wrong while creating ${modelName} model.\nGot ${error}`
            );
          });
      })
  )
  .addCommand(
    new Command("controller")
      .description(
        "Generate a new controller with predefined CRUD API endpoints. Run controller --help to learn more"
      )
      .argument("<modelName>", "Name of the model to create controller.")
      .argument(
        "[actions...]",
        "Specific the actions to include for the controller (:index, :show, :create, :update, :destroy). Defaults to all if not specified."
      )
      .action((controllerName, actions) => {
        checkControllerStruct();

        addController(controllerName, actions);
      })
  )
  .addCommand(
    new Command("routes")
      .description("Generate routes for the controller.")
      .argument(
        "<controllerName>",
        "Name of the controller to create its routes."
      )
      .argument(
        "[endpoints...]",
        "Specific the endpoint to include routes for the controller (:index, :show, :create, :update, :destroy). Defaults to all if not specified."
      )
      .action((controllerName, endpoints) => {
        checkRoutesStruct();

        addRoutes(controllerName, endpoints);
      })
  );

program
  .command("scaffold")
  .description(
    "Generates a model scaffold with the specified name and attributes. " +
      "The attributes define the fields of the model in the format FIELDNAME:TYPE. " +
      "Scaffold command will generate the model, controller and routes for the given attributes. It will generate all the CRUD endpoints."
  )
  .usage("<modelName> <attributes...>")
  .argument("<modelName>", "Specify the name of the model.")
  .argument("<attributes...>", "Attributes for the model. [FIELDNAME:TYPE]")
  .action((modelName, attributes) => {
    checkModelStruct();
    checkControllerStruct();
    checkRoutesStruct();

    scaffold(modelName, attributes);
  });

program.parse(process.argv);
