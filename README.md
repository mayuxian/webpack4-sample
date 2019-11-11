
## TODO:

1. 取消生成为混淆压缩的bundle.js，方便查看编译后的文件 [设置optimization.minimize=false]
2. responsive-loader和file-loader 有什么区别？
3. stylus样式？
4. autoprefixer在webpack.config.js中引入的方式  优先级低
5. html-loader什么时候用？
6. 

## Infos

1. 引入jequery的几种方式
- let $=require('expose-loader?$:jquery');
- webpack的 module.rules  {test:'require.resolve('jquery'),loader:['expose-loader?$']}
- webpack.providePlugin({$:'jquery'})

2. \<img src="img/logo.png" /> 此种需要 html-withimg-plugin

3. webpack配置文件若使用autoprefixer，则在package.json中需要配置
```
 "browserslist": [
      "defaults",
      "not ie < 11",
      "last 2 versions",
      "> 1%",
      "iOS 7",
      "last 3 iOS versions"
    ]
```
