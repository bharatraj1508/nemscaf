const { createModel } = require("../fs/createModels");
const { createAuthentication } = require("../fs/createAuth");

const createStructure = (dirPath, logTaskProgress) => {
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
      fn: (dir) => createAuthentication(dir),
      desc: "creating authentication routes and controller",
    },
  ];

  tasks.forEach((task) => logTaskProgress(task, dirPath));
};

module.exports = { createStructure };
