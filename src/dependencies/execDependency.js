const path = require("path");
const fs = require("fs");
const { getLatestPkgVersion } = require("../dependencies/getPackageVersion");

const dependencies = [
  "dotenv",
  "body-parser",
  "cors",
  "express",
  "jsonwebtoken",
  "mongoose",
  "bcryptjs",
];
const devDependencies = ["nodemon"];

const fetchPackages = async (dirPath, dirName, options) => {
  const deps = {};
  const devDeps = {};

  if (options.passport) {
    dependencies.push("passport", "passport-jwt");
  }

  if (options.joi) {
    dependencies.push("joi");
  }

  process.stdout.write("fetching project packages... ⏳\x1b[?25l");
  for (const dep of dependencies) {
    deps[dep] = `^${await getLatestPkgVersion(dep)}`;
  }
  for (const devDep of devDependencies) {
    devDeps[devDep] = `^${await getLatestPkgVersion(devDep)}`;
  }

  const packageJsonContent = {
    name: dirName.toLowerCase().replace(/\s+/g, "-"),
    version: "1.0.0",
    description: "",
    main: "index.js",
    scripts: {
      start: "node index.js",
    },
    dependencies: deps || {},
    devDependencies: devDeps || {},
  };

  const filePath = path.join(dirPath, "package.json");

  fs.writeFileSync(
    filePath,
    JSON.stringify(packageJsonContent, null, 2),
    "utf-8"
  );
};

module.exports = { fetchPackages };
