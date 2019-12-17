const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: 'source-map',
  output: {
    publicPath: '/'
  },
  devServer: {
    inline: true,//默认inline模式，还有iframe模式
    contentBase: path.join(__dirname, "dist"),
    host: "localhost",
    port: 53000,
    hot: true,
    compress: false,
    open: true,
    overlay: true
  },
  module: {
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack4-Config-Sample",
      filename: "index.html",
      // chunks:[],
      template: path.join(__dirname, "./../src/index.html"),
      hash: true, //引入js: main.js？hash值，避免缓存的影响
      minify: {
        removeAttributeQuotes: true //移除双引号
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR 提示更新文件名，而不是更新文件模块id
  ],
  optimization: {
    minimize: false
  }
});