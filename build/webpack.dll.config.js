const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: "production",
  entry: {
    vendor: ['vue', 'vuex', 'vue-router'],
    utils: ['axios'],
    // vendor: ['vue/dist/vue.runtime.esm.js'], //可只打包这一个文件
  },
  output: {
    filename: "[name].dll.js",
    path: path.resolve(__dirname, "../dll"),
    library: "dll_[name]",
    //libraryTarget: 'umd'  //默认为var
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: "dll_[name]",
      path: path.join(__dirname, "../dll/", '[name].manifest.json'),
      // context: path.join(__dirname, "")  //默认context的值为：工程根目录
    })
  ]
};