const fs = require("fs");
const path = require("path");

const insertAfterLastMatch = (content, regex, newLine) => {
  const matches = content.match(regex);

  if (matches && matches.length > 0) {
    const lastMatch = matches[matches.length - 1];
    const lastMatchIndex = content.lastIndexOf(lastMatch);

    // Insert new line after the last match
    return (
      content.slice(0, lastMatchIndex + lastMatch.length) +
      `\n` +
      newLine +
      content.slice(lastMatchIndex + lastMatch.length)
    );
  } else {
    // If no match is found, append the new line at the end
    return content + `\n` + newLine;
  }
};

const modifyIndexFile = (controllerName) => {
  const indexFilePath = path.join(process.cwd(), "index.js");

  if (!fs.existsSync(indexFilePath)) {
    console.error(
      "\x1b[31mError: index.js file not found in the project root.\x1b[0m"
    );
    process.exit(1);
  }

  try {
    // Read the content of index.js
    var fileContent = fs.readFileSync(indexFilePath, "utf8");

    const routePath = `./src/routes/${controllerName}Routes`;

    // Check if the route is already added
    if (fileContent.includes(routePath)) {
      return;
    }

    // Regex for `require` statements
    const requireRegex = /.*require\(.*\);/g;
    const newRequireStatement = `const ${controllerName}Routes = require("./src/routes/${controllerName}Routes");`;

    // Insert the new `require` statement
    fileContent = insertAfterLastMatch(
      fileContent,
      requireRegex,
      newRequireStatement
    );

    // Regex for `app.use` statements
    const appUseRegex = /.*app\.use\(.*\);/g;
    const newAppUseStatement = `app.use("/${controllerName}", ${controllerName}Routes);`;

    // Insert the new `app.use` statement
    fileContent = insertAfterLastMatch(
      fileContent,
      appUseRegex,
      newAppUseStatement
    );

    fs.writeFileSync(indexFilePath, fileContent, "utf-8");
    console.log(`\x1b[33mmodified - ${indexFilePath}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = { modifyIndexFile };
