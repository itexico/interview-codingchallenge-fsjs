require("babel-register");
/* eslint-disable no-console */
(async function() {
  const chalk = require("chalk");

  const { mongoose } = require("../src/lib/");

  console.clear();
  console.log(chalk.cyan("Cleaning MongoDB collections from blog service"));

  await mongoose.dropDatabase().catch(err => console.log(chalk.red(err)));

  console.log(chalk.green("Collections from blog services, dropped"));
  console.log(chalk.cyan("Closing MongoDB connection"));

  mongoose.close();

  process.exitCode = 0;
})();
