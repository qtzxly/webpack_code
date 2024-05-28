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
      }
    ]
  },
  // 插件
  plugins: [],
  mode: 'development'
}
