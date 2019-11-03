const path = require('path');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const VueLoaderConfig = require('./../vue.config.js')
const autoprefixer = require('autoprefixer');
module.exports = {
  // entry: {
  //   main: './src/index.js',  //默认名称moren 
  //   home: ""
  // },
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, "./../dist"),
    // filename: "bundle.js",
    filename: "[name].[hash:8].bundle.js",
    // publicPath: "/"  //配置后引用的js的src首位会有/，则file协议请求报错，找不到文件
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              // VueLoaderConfig,
              // postcss: [
              //   require('autoprefixer')()
              // ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10 * 1024,
            name: 'img/[name]-[hash:6].[ext]'
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          // "vue-style-loader",
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: "/\.less$/",
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: "/\.scss$/",
        loader: ['style!css!postcss!sass']
      }
    ]
  },
  // postcss: [autoprefixer()],
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Webpack4-Config-Sample",
      filename: "index.html",
      template: path.join(__dirname, "./../src/index.html"),
      hash: true, //引入js后面会有 ？hash值，避免缓存的影响
      minify: {
        removeAttributeQuotes: true //移除双引号
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery"
    }
    ),
    new CopyWebpackPlugin([
      {
        from: './src/static',
        to: "static"
      }
    ]),
    new VueLoaderPlugin()
  ],
  optimization: {
    minimize: false
  }
}