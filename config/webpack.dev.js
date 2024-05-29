const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    // 绝对路径。 __dirname：当前文件夹路径
    // 开发模式不需要输出
    path: undefined,
    filename: 'static/js/main.js',
    // 打包前删除path目录
    clean: true
  },
  // 加载器
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          // 提取成单独文件 替换style-loader
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            // 小于 10kb 的图片转base64
            // 减少请求， 体积会增大
            maxSize: 20 * 1024 // 10kb
          }
        },
        generator: {
          filename: 'static/images/[name].[hash:10][ext][query]'
        }
      },
      // 字体 图表库文件 音频视频
      {
        test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
        // 不转化为base64
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name].[hash:10][ext][query]'
        }
      },
      {
        test: /\.m?js$/,
        // 排除
        exclude: /node_modules/,
        loader: 'babel-loader'
        // options: {
        //   presets: ['@babel/preset-env']
        // }
      }
    ]
  },
  // 插件
  plugins: [
    new ESLintPlugin({
      // 检测哪些文件
      context: path.resolve(__dirname, '../src')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new MiniCssExtractPlugin()
  ],
  devServer: {
    host: 'localhost',
    // compress: true, //对devServer 所有服务启用 gzip 压缩
    port: 3000,
    open: true
  },
  mode: 'development',
  // devtool: 'cheap-module-source-map'
  devtool: 'source-map'
}
