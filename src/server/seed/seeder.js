require("babel-register");
/* eslint-disable no-console */
(async function() {
  const chalk = require("chalk");
  const { random } = require("faker");

  const { seed } = require("../src/api/components/utils");
  const { mongoose } = require("../src/lib/");

  console.clear();
  console.log(chalk.cyan("Seeding MongoDB with posts and tags"));

  await seed.seedDB(random.number({ max: 20, min: 5 })).catch(err => {
    console.log(chalk.red(err));
    process.exitCode = 1;
  });

  console.log(chalk.green("MongoDB seeded"));
  console.log(chalk.cyan("Closing connection with MongoDB"));

  mongoose.close();

  process.exitCode = 0;
})();
