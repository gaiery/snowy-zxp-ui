const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const glob = require('glob')
const list = {}
// let MiniCssExtractPlugin = require('mini-css-extract-plugin');// 抽离css的插件
// list = {
//     card:'/components/lib/card/index.js',
//     button:'/components/lib/button/index.js'
//  }
async function makeList(dirPath,list){
    const files = glob.sync(`${dirPath}/**/index.js`) // 获取文件路径，它可以基于通配符模式快速找到符合条件的文件或文件夹路径
    for(let file of files) {
        const component = file.split(/[/.]/)[2]
        list[component] = `./${file}` // ./components/lib/card/index.js
    }
}
makeList('components/lib',list)
module.exports = {
  entry:list,
  mode:'development',
  output: {
      filename:'[name].umd.js', // card.umd.js
      path:path.resolve(__dirname,'dist'),
      library:'rui',
      libraryTarget:'umd',
  },
  // plugins: [
  //   new MiniCssExtractPlugin({
  //     filename: "main.css",  //打包后的css文件
  //   })
  // ],
  module:{
      rules: [
          {
              test:/\.vue$/,
              use: ['vue-loader']
          },
          {
            test: /\.(scss|sass)$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
          },
        // {
        //     test: /\.scss$/,
        //     use: [
        //       MiniCssExtractPlugin.loader,
        //       {
        //         loader: 'css-loader'
        //       },
        //       {
        //         loader: "resolve-url-loader"  //因为scss-loader没有重写url的功能，所以必须安装这个
        //       },
        //       {
        //         loader: "sass-loader", // 将 Sass 编译成 CSS
        //         options: { sourceMap: true }  //必须要写
        //       }
        //     ]
        //   },
          { 
            test: /\.(png|jpe?g|gif|svg)$/i,
            use: [
                {
                    loader:'url-loader',
                    options:{
                        limit:8000,
                        name:'images/[name].[hash:8].[ext]'
                    }
                }
            ]
          },
          // {
          //   test: /\.(png|jpe?g|gif|svg)$/i,
          //   type: "asset",
          //   parser: {
          //     dataUrlCondition: {
          //       maxSize: 1 * 1024, // 小于1kb转base64，减少请求次数
          //     },
          //   },
          //   generator: {
          //     filename: "static/images/[hash:10][ext][query]", // 指定打包路径和文件名
          //   },
          // },
      ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
}