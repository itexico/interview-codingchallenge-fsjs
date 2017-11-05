/*
  Okay folks, want to learn a little bit about webpack?
*/

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const javascript = {
  test: /\.(js)$/,
  loader: 'babel-loader',
  exclude: /node_modules/
};

const uglify = new webpack.optimize.UglifyJsPlugin({
  compress: { warnings: false }
});

const config = {
  entry: {
    app: './src/client/index.js'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'src', 'server', 'static'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [javascript]
  },
  plugins: [
    uglify,
    new HtmlWebpackPlugin({
      title: 'Challenge App'
    })
  ]
};
// webpack is cranky about some packages using a soon to be deprecated API. shhhhhhh
process.noDeprecation = true;

module.exports = config;
