const fs = require("fs");
const path = require("path");

const createAuthentication = (dirPath) => {
  const directories = [
    "src/controllers",
    "src/routes",
    "src/utils",
    "src/middlewares",
  ];

  // Create directories if they don't exist
  directories.forEach((item) => {
    const fullPath = path.join(dirPath, item);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  });

  // Define files to copy and their target paths
  const authControllerFile = path.join(
    __dirname,
    "files",
    "controllers",
    "authController.js"
  );
  const authRoutesFile = path.join(
    __dirname,
    "files",
    "routes",
    "authRoutes.js"
  );
  const jwtFile = path.join(__dirname, "files", "utils", "jwt.js");

  const reqAuthFile = path.join(
    __dirname,
    "files",
    "middlewares",
    "requireAuth.js"
  );

  const files = [
    {
      file: authControllerFile,
      path: "src/controllers",
      name: "authController.js",
    },
    {
      file: authRoutesFile,
      path: "src/routes",
      name: "authRoutes.js",
    },
    {
      file: jwtFile,
      path: "src/utils",
      name: "jwt.js",
    },
    {
      file: reqAuthFile,
      path: "src/middlewares",
      name: "requireAuth.js",
    },
  ];

  // Read and write files
  files.forEach((item) => {
    try {
      const contentToWrite = fs.readFileSync(item.file, "utf8");
      const filePath = path.join(dirPath, item.path, item.name);

      fs.writeFileSync(filePath, contentToWrite.trim(), { flag: "w" });
    } catch (error) {
      console.error(`Error processing file ${item.file}: ${error.message}`);
    }
  });
};

module.exports = { createAuthentication };
