const { createModel } = require("../fs/createModels");
const { createAuthentication } = require("../fs/createAuth");
const { createUserController } = require("../fs/createUserController");
const { createUserRoutes } = require("../fs/createUserRoutes");

const createStructure = (dirPath, logTaskProgress, options) => {
  const tasks = [
    {
      index: 1,
      name: "models",
      fn: (dir) => createModel(dir, "user"),
      desc: "creating models",
    },
    {
      index: 2,
      name: "auth",
      fn: (dir) => createAuthentication(dir, options),
      desc: "creating authentication routes and controller",
    },
    {
      index: 3,
      name: "controller",
      fn: (dir) => createUserController(dir),
      desc: "creating user controller",
    },
    {
      index: 4,
      name: "routes",
      fn: (dir) => createUserRoutes(dir, options),
      desc: "creating user routes",
    },
  ];

  tasks.forEach((task) => logTaskProgress(task, dirPath));
};

module.exports = { createStructure };
