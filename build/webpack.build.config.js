const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const manifest = require('../dll/vendor.manifest.json');

module.exports = merge(baseConfig, {
  mode: "production",
  module: {

  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack4-Config-Sample",
      filename: "index.html",
      template: path.join(__dirname, "./../src/index.html"),
      hash: true, //引入js: main.js？hash值，避免缓存的影响
      minify: {
        removeAttributeQuotes: true //移除双引号
      }
    }),
    new webpack.DllReferencePlugin({
      // context: path.join(__dirname, ""),
      manifest: manifest
    }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['!dll/**/*']
    }),
    new CopyWebpackPlugin([
      {
        from: './src/static',
        to: "static"
      },
      {
        from: "./dll",
        to: "dll"
      }
    ]),
  ],
  optimization: {
    minimize: false
  }
})