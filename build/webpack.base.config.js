const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const vendorManifest = require('../dll/vendor.manifest.json');
const utilsManifest = require('../dll/utils.manifest.json');

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const threadLoader = require('thread-loader');
// const os = require('os');

let threadLoaderOptions = {
  // 产生的 worker 的数量，默认是 cpu 的核心数
  workers: 2,//os.cpus().length,//2,
  // 一个 worker 进程中并行执行工作的数量
  // 默认为 20
  workerParallelJobs: 50,
  // 额外的 node.js 参数
  workerNodeArgs: ['--max-old-space-size', '1024'],
  // 闲置时定时删除 worker 进程
  // 默认为 500ms
  // 可以设置为无穷大， 这样在监视模式(--watch)下可以保持 worker 持续存在
  poolTimeout: 2000,
  // 池(pool)分配给 worker 的工作数量
  // 默认为 200
  // 降低这个数值会降低总体的效率，但是会提升工作分布更均一
  poolParallelJobs: 50,
  // 池(pool)的名称
  // 可以修改名称来创建其余选项都一样的池(pool)
  name: "my-pool"
}
//预热
// threadLoader.warmup({}, [
//   'babel-loader',
//   'sass-loader',
// ]);

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
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            //options: {
            // VueLoaderConfig,
            // postcss: [
            //   require('autoprefixer')()
            // ]
            //}
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: "/(node_modules)/",
        use: [
          // {
          //   loader: "thread-loader",
          //   options: threadLoaderOptions
          // },
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", {
                //设置false表示取消babel/preset-env转换成commonjs(默认)的方式
                modules: false,  //改成false，支持es6，是为了摇树优化
                loose: true  //"normal"接近es6,false接近es5
              }]],
              plugins: ["@babel/plugin-transform-runtime"]
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
    new VueLoaderPlugin(),
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
    new webpack.DllReferencePlugin({
      manifest: vendorManifest
    }),
    new webpack.DllReferencePlugin({
      manifest: utilsManifest
    }),
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