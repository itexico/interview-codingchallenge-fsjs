const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, ".env.test") });

module.exports = {
  silent: true,
  testEnvironment: "node",
  verbose: true,
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
