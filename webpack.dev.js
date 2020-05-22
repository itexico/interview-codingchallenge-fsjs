const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DotEnv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map",
  entry: "./src/client/index.js",
  output: {
    path: path.resolve(__dirname, "build/client"),
    publicPath: "/",
    filename: "app.bundle.js",
  },
  devServer: {
    overlay: true,
    historyApiFallback: true,
  },
  plugins: [
    new DotEnv({
      path: `src/client/.env`,
    }),
    new HtmlWebpackPlugin({
      template: "src/client/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src/client"),
        use: ["babel-loader"],
        resolve: {
          extensions: [".js", ".jsx"],
        },
      },
    ],
  },
};
