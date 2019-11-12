const path = require('path');

const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

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
        test: /\.jsx?$/,
        exclude: "/(node_modules)/",
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", {
              //设置false表示取消babel/preset-env转换成commonjs(默认)的方式
              modules: false,  //改成false，支持es6，是为了摇树优化
              loose: true  //"normal"接近es6,false接近es5
            }]],
            plugins: ["@babel/plugin-transform-runtime"]
          }
        }
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
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10 * 1024,
            name: 'images/[name]-[hash:6].[ext]'
          }
        }]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10 * 1024,
            name: 'media/[name]-[hash:6].[ext]'
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10 * 1024,
            name: 'fonts/[name]-[hash:6].[ext]'
          }
        }]
      },
    ]
  },
  // postcss: [autoprefixer()],
  // postcss: [autoprefixer()],
  plugins: [
    new CleanWebpackPlugin({
      // cleanAfterEveryBuildPatterns: ['!dll/**/*']
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.ProvidePlugin({
      $: "jquery"
     }
    )
  ]
}