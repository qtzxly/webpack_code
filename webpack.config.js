const path = require('path')

module.exports = {
  entry: './src/main.js',
  output: {
    // 绝对路径。 __dirname：当前文件夹路径
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  // 加载器
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          'style-loader',
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
        }
      }
    ]
  },
  // 插件
  plugins: [],
  mode: 'development'
}
