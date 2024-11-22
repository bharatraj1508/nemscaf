const { exec } = require("child_process");

const getLatestPkgVersion = (pkg) => {
  return new Promise((resolve, reject) => {
    exec(`npm show ${pkg} version`, (err, stdout) => {
      if (err) reject(err);
      resolve(stdout.trim());
    });
  });
};

module.exports = { getLatestPkgVersion };
