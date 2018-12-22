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
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Challenge App',
      template: './src/client/index.template.html'
    })
  ]
};

module.exports = config;
