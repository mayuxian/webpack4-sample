const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const VueLoaderConfig = require('./../vue.config.js')
const autoprefixer = require('autoprefixer');
module.exports = {
  entry: {
    main: "./src/index.js",  //默认名称main 
    home: "./src/home.js"
  },
  // entry: './src/index.js',
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
          MiniCssExtractPlugin.loader,
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
        test: /\.less$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", 'less-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', "postcss-loader", 'sass-loader']
        // loader: ['style-loader!css-loader!postcss-loader!sass-loader'], //字符串时要是loader
      }
    ]
  },
  // postcss: [autoprefixer()],
  // postcss: [autoprefixer()],
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      title: "Webpack4-Config-Sample",
      filename: "index.html",
      template: path.join(__dirname, "./../src/index.html"),
      hash: true, //引入js: main.js？hash值，避免缓存的影响
      minify: {
        removeAttributeQuotes: true //移除双引号
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery"
    }
    )
  ],
  //多入口抽取css到一个文件：https://segmentfault.com/q/1010000017990233/
  optimization: {
    minimize: false,
    // chunkIds: 'named',
    // moduleIds: 'hashed',
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true
  }
}