const readline = require("readline");
const { executeCommand } = require("../../../utils/execCommand");

const promptQuestion = (controllerName) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    `\x1b[33mDo you want to create a model by the name "${controllerName}"? (yes/no): \x1b[0m`,
    (answer) => {
      if (answer.toLowerCase() === "yes" || answer.toLowerCase() === "y") {
        executeCommand(
          `nemscaf add model ${controllerName.charAt(0).toUpperCase() + controllerName.slice(1)}`,
          (stdout) => {
            console.log(stdout);
            console.log(
              `\x1b[33mPlease specify the schema attributes in file 'src/models/${controllerName.charAt(0).toUpperCase() + controllerName.slice(1)}.js' file before processding to create the controller.`
            );
          }
        );

        rl.close();
      } else {
        console.log("\x1b[31mOperation canceled. Exiting...\x1b[0m");
        process.exit(1);
      }
    }
  );
};

module.exports = { promptQuestion };
