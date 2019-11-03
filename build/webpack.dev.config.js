const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  mode: "production",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    host: "localhost",
    port: 53000,
    hot: true,
    compress: false,
    open: true
  },
  module: {
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    minimize: false
  }
})