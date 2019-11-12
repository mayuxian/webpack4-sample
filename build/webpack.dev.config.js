const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['!dll/**/*']
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR 提示更新文件名，而不是更新文件模块id
    new CopyWebpackPlugin([
      {
        from: './src/static',
        to: "static"
      }
    ]),
  ],
  optimization: {
    minimize: false
  }
})