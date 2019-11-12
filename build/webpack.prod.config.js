const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const UglifyJS = require('uglify-es');
const DefaultUglifyJsOptions = UglifyJS.default_options();
const compress = DefaultUglifyJsOptions.compress;
for (let compressOption in compress) {
  compress[compressOption] = false;
}
compress.unused = true;

//TODO:动态生成
const vendorManifest = require('../dll/vendor.manifest.json');
const utilsManifest = require('../dll/utils.manifest.json');

module.exports = merge(baseConfig, {
  mode: "production",
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
    new webpack.DllReferencePlugin({
      manifest: vendorManifest
    }),
    new webpack.DllReferencePlugin({
      manifest: utilsManifest
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
  //多入口抽取css到一个文件：https://segmentfault.com/q/1010000017990233/
  optimization: {
    minimize: true,
    minimizer: [
      // new OptimizeCSSAssetsPlugin(),
      // new TerserWebpackPlugin({
      //   cache: false,
      //   parallel: true,
      //   sourceMap: true,  //如果production模式使用sourceMap，则此必须设置成true
      //   terserOptions: {
      //     // ecma: undefined,
      //     // warnings: false,
      //     // parse: {},
      //     compress: {},
      //     // mangle: true, // Note `mangle.properties` is `false` by default.
      //     module: false,
      //     // output: null,
      //     // toplevel: false,
      //     // nameCache: null,
      //     // ie8: false,
      //     // keep_classnames: undefined,
      //     // keep_fnames: false,
      //     // safari10: false,
      //   },
      // }),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress,
          mangle: false,
          output: {
            beautify: true
          }
        }
      })
    ],
    // splitChunks: {
    //   chunks: "all", // 要分割哪些模块：all（推荐）, async(默认，只分隔异步代码), and initial
    //   minSize: 10 * 1024,
    //   maxSize: 5 * 1024,
    //   minChunks: 1,
    //   maxAsyncRequests: 5,
    //   automaticNameDelimiter: "~",
    //   name: true,
    //   // cacheGroups: {
    //   //   vendors: {
    //   //     test: /[\\/]node_modules[\\/]/,
    //   //     priority: -10,
    //   //     filename: 'vendors.js',
    //   //     enforce: true, //无视minChunks、maxAsyncRequests等选项
    //   //   },
    //   //   default: {
    //   //     minChunks: 2,
    //   //     priority: -20,
    //   //     reuseExistingChunk: true, //复用
    //   //   },
    //   //   styles: {
    //   //     name: "styles",
    //   //     test: /\.less$/,
    //   //     chunks: "all",
    //   //     enforce: true
    //   //   }
    //   // }
    // },
    //package.json中sideEffects标记有副作用代码，不使用tree-shaking/
    usedExports: true,  //使用export方式，可进行摇树优化。
    sideEffects: true, //可识别某些库中的配置的摇树优化的功能无副作用，默认false 忽略
    // chunkIds: 'named',
    // moduleIds: 'hashed',
    // splitChunks: {
    //   chunks: 'all'
    // },
    // runtimeChunk: true
  }
})