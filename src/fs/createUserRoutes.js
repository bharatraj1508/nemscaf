const fs = require("fs");
const path = require("path");

const createUserRoutes = (dirPath, options) => {
  // Define files to copy and their target paths

  let userRoutesFile;

  options.passport
    ? (userRoutesFile = path.join(
        __dirname,
        "files",
        "routes",
        "passportUserRoutes.js"
      ))
    : (userRoutesFile = path.join(
        __dirname,
        "files",
        "routes",
        "userRoutes.js"
      ));

  // Read and write files
  try {
    const contentToWrite = fs.readFileSync(userRoutesFile, "utf8");
    const filePath = path.join(dirPath, "src/routes", "userRoutes.js");

    fs.writeFileSync(filePath, contentToWrite.trim(), { flag: "w" });
  } catch (error) {
    console.error(`Error processing file userController: ${error.message}`);
  }
};

module.exports = { createUserRoutes };
