const fs = require("fs");
const path = require("path");

const createRouteFile = (controllerName, template) => {
  try {
    var msg = "";
    const filePath = path.join(
      process.cwd(),
      "src/routes",
      `${controllerName.toLowerCase()}Routes.js`
    );

    fs.existsSync(filePath)
      ? (msg = `\x1b[33mmodified - ${filePath}`)
      : (msg = `\x1b[32mcreated - ${filePath}`);

    fs.writeFileSync(filePath, template.trim(), { flag: "w" });
    console.log(msg);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = { createRouteFile };
