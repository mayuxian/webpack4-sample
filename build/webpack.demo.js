module.exports = {
  splitChunks: { // 代码分隔配置
    /*
    * 选择要进行分割的包
    * 可选值： all（推荐）, async(默认，只分隔异步代码), and initial(只分割同步代码)
    * 还可以传入函数精确控制
    * chunks (chunk) {
         // exclude `my-excluded-chunk`
         return chunk.name !== 'my-excluded-chunk';
       }
    * */
    chunks: 'all',

    // 默认，大于30k的包才做代码分割
    minSize: 30000,

    // 默认，分割出来的每个包最大size，
    // 比如设为50000（50kb），那如果某个包分离出来后超过50kb，就会进行再分割，保证每个文件都不超过50kb
    maxSize: 0,

    // 默认，至少被引入一次就进行代码分隔
    minChunks: 1,

    // 默认，浏览器最多并行请求5个js文件,也就是说，分割数量超过5个时，就会停止代码分割了
    maxAsyncRequests: 5,

    // 默认，对于入口文件最多只分割3个js包，超过3个就停止
    maxInitialRequests: 3,

    // 默认，文件名连接符
    automaticNameDelimiter: '~',

    // 默认，分割后的文件名将根据chunks和cacheGroups自动生成名称。
    name: true,

    cacheGroups: {
      vendors: {  // vendors是组名

        // 默认，只对node_modules里的代码进行分隔
        test: /[\\/]node_modules[\\/]/,

        /*
          默认，每个组都会有个优先级，
          如果某个包满足多个组的test规则，就按优先级来判断归哪个组
          数值越大，优先级越高
        */
        priority: -10,

        // 分割后的文件名（默认是：组名~入口名.js，即verdors~main.js）
        filename: 'vendors.js',

        // 强制分隔，无视minChunks、maxAsyncRequests等选项，默认false
        enforce: true
      }
    },


    default: {  // default是组名, 分隔不在node_modules里的代码
      minChunks: 2,   // 默认
      priority: -20,    // 默认

      /*
        复用已存在的chunk,
        比如index.js里引入axios和test.js
        test里也引入了axios，那么axios就会被复用
      */
      reuseExistingChunk: true
    },

    /*
    * 将项目所有css打包到一个文件中
    * 还可以分入口打包：https://webpack.js.org/plugins/mini-css-extract-plugin
    * */
    styles: {
      name: 'styles',
      test: /\.less$/,
      chunks: 'all',
      enforce: true,
    }
  }
}
}