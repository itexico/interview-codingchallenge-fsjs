const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WpckBA = require("webpack-bundle-analyzer");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const DotEnv = require("dotenv-webpack");

module.exports = {
  mode: "production",
  target: "web",
  devtool: "source-map",
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
    new CleanWebpackPlugin(),
    new WpckBA.BundleAnalyzerPlugin({
      analyzerMode: "static",
    }),
    new DotEnv({
      path: `src/client/.env`,
    }),
    new HtmlWebpackPlugin({
      template: "src/client/index.html",
      minify: {
        useShortDoctype: true,
        removeStyleLinkTypeAttributes: true,
        removeScriptTypeAttributes: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeComments: true,
        minifyURLs: true,
        minifyJS: true,
        keepClosingSlash: true,
        collapseWhitespace: true,
      },
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
