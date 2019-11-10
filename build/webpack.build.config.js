const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const manifest = require('../dll/vendor.manifest.json');

module.exports = merge(baseConfig, {
  mode: "production",
  module: {

  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, "../"),
      manifest: manifest,
      // name:"verdor",
      // context: manifest.content
      // scope: 'xyz',
      // sourceType: 'commonjs2'
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