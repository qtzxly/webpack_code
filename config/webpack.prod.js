const os = require('os')

const path = require('path')
// const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin')

// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
// const { extendDefaultPlugins } = require('svgo')

const threads = os.cpus().length

function getStyleLoader(pre = null) {
  return [
    // 提取成单独文件 替换style-loader
    MiniCssExtractPlugin.loader,
    'css-loader',

    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['postcss-preset-env']
        }
      }
    },
    pre
  ]
}

module.exports = {
  // entry: './src/main.js',
  entry: {
    app: './src/app.js',
    main: './src/main.js'
  },
  output: {
    // 绝对路径。 __dirname：当前文件夹路径
    path: path.resolve(__dirname, '../dist'),
    // filename: 'static/js/main.js',
    // 入口文件输出的文件名
    // filename: 'static/js/[name].js',
    filename: 'static/js/[name].[contenthash:8].js',
    // 其他文件输出的文件名
    // chunkFilename: 'static/js/[name].chunk.js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    assetModuleFilename: 'static/media/[name].[hash:10][ext][query]',
    // 打包前删除path目录
    clean: true
  },
  // 加载器
  module: {
    rules: [
      {
        // 每个文件只被一个loader处理
        oneOf: [
          {
            test: /\.css$/i,
            // 执行顺序：右到左（下到上)
            use: getStyleLoader()
          },
          {
            test: /\.less$/i,
            use: getStyleLoader('less-loader')
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
            // generator: {
            //   filename: 'static/images/[name].[hash:10][ext][query]'
            // }
          },
          // 字体 图表库文件 音频视频
          {
            test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
            // 不转化为base64
            type: 'asset/resource'
            // generator: {
            //   filename: 'static/media/[name].[hash:10][ext][query]'
            // }
          },
          {
            test: /\.m?js$/,
            // 排除
            exclude: /node_modules/,
            use: [
              {
                loader: 'thread-loader', // 开启多进程
                options: {
                  works: threads // 数量
                }
              },
              {
                loader: 'babel-loader',
                options: {
                  // cacheDirectory: true, // 缓存
                  // cacheCompression: false // 关闭缓存压缩
                  plugins: ['@babel/plugin-transform-runtime']
                }
              }
            ]

            // loader: 'babel-loader'
            // options: {
            //   presets: ['@babel/preset-env']
            // }
          }
        ]
      }
    ]
  },
  // 插件
  plugins: [
    // new ESLintPlugin({
    //   // 检测哪些文件
    //   context: path.resolve(__dirname, '../src'),
    //   threads
    // }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new MiniCssExtractPlugin({
      // filename: 'static/css/[name].css',
      // chunkFilename: 'static/css/[name].chunk.css'
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
    }),
    new PreloadWebpackPlugin({
      // rel: 'preload', // preload兼容性更好
      // as: 'script'
      rel: 'prefetch' // prefetch兼容性更差
    })
    // new CssMinimizerPlugin(),
    // new TerserWebpackPlugin({
    //   parallel: threads
    // })
  ],
  optimization: {
    // 代码分割配置
    splitChunks: {
      chunks: 'all', // 对所有模块都进行分割
      // 以下是默认值
      // minSize: 20000, // 分割代码最小的大小
      // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
      // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
      // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
      // maxInitialRequests: 30, // 入口js文件最大并行请求数量
      // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
      // cacheGroups: { // 组，哪些模块要打包到一个组
      //   defaultVendors: { // 组名
      //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
      //     priority: -10, // 权重（越大越高）
      //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
      //   },
      //   default: { // 其他没有写的配置会使用上面的默认值
      //     minChunks: 2, // 这里的minChunks权重更大
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      // },
      // 修改配置
      cacheGroups: {
        // 组，哪些模块要打包到一个组
        // defaultVendors: { // 组名
        //   test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
        //   priority: -10, // 权重（越大越高）
        //   reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
        // },
        // default: {
        //   // 其他没有写的配置会使用上面的默认值
        //   minSize: 0, // 我们定义的文件体积太小了，所以要改打包的最小文件体积 ，0是故意写的最小
        //   minChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true
        // }
      }
    },
    // 提取runtime文件
    /*  问题：
当我们修改 math.js 文件再重新打包的时候，因为 contenthash 原因，math.js 文件 hash 值发生了变化（这是正常的）。

但是 main.js 文件的 hash 值也发生了变化，这会导致 main.js 的缓存失效。明明我们只修改 math.js, 为什么 main.js 也会变身变化呢？

原因：

更新前：math.xxx.js, main.js 引用的 math.xxx.js
更新后：math.yyy.js, main.js 引用的 math.yyy.js, 文件名发生了变化，间接导致 main.js 也发生了变化
解决：

将 hash 值单独保管在一个 runtime 文件中。

我们最终输出三个文件：main、math、runtime。当 math 文件发送变化，变化的是 math 和 runtime 文件，main 不变。

runtime 文件只保存文件的 hash 值和它们与文件关系，整个文件体积就比较小，所以变化重新请求的代价也小。 */
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}` // runtime文件命名规则
    },
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin({
        parallel: threads
      })
      // new ImageMinimizerPlugin({
      //   minimizer: {
      //     implementation: ImageMinimizerPlugin.imageminGenerate,
      //     options: {
      //       plugins: [
      //         ['gifsicle', { interlaced: true }],
      //         ['jpegtran', { progressive: true }],
      //         ['optipng', { optimizationLevel: 5 }],
      //         [
      //           'svgo',
      //           {
      //             plugins: [
      //               'preset-default',
      //               'prefixIds',
      //               {
      //                 name: 'sortAttrs',
      //                 params: {
      //                   xmlnsOrder: 'alphabetical'
      //                 }
      //               }
      //             ]
      //           }
      //         ]
      //       ]
      //     }
      //   }
      // })

      // minimizerOptions: {
      //   // Lossless optimization with custom option
      //   // Feel free to experiment with options for better result for you
      //   plugins: [
      //     ['gifsicle', { interlaced: true }],
      //     ['jpegtran', { progressive: true }],
      //     ['optipng', { optimizationLevel: 5 }],
      //     // Svgo configuration here https://github.com/svg/svgo#configuration
      //     [
      //       'svgo',
      //       {
      //         plugins: extendDefaultPlugins([
      //           {
      //             name: 'removeViewBox',
      //             active: false
      //           },
      //           {
      //             name: 'addAttributesToSVGElement',
      //             params: {
      //               attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }]
      //             }
      //           }
      //         ])
      //       }
      //     ]
      //   ]
      // }
    ]
  },
  devServer: {
    host: 'localhost',
    // compress: true, //对devServer 所有服务启用 gzip 压缩
    port: 3000,
    open: true,
    hot: true
  },
  mode: 'production'
  // devtool: 'source-map'
}
