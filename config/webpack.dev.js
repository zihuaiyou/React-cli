const EslintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebapckPlugin = require('html-webpack-plugin');
const path = require('path');

const getStyleLoader = function (pre) {
  return [
    'style-loader',
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
  ].filter(Boolean)
}

module.exports = {
  entry: path.resolve(__dirname,"../src/main.js"),
  output: {
    path: undefined,
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].chunk.js',
    assetModuleFilename: 'static/media/[hash:10][ext][query]'
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: getStyleLoader()
          },
          {
            test: /\.less$/,
            use: getStyleLoader('less-loader')
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoader('sass-loader')
          },
          {
            test: /\.jpe?g|png|gif|webp|svg$/,
            type: "asset"
          },
          {
            test: /\.ttf|woff2?$/,
            type: "asset/resource"
          },
          {
            test: /\.js|jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_modules',
      cache: true,
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache')
    }),
    new HtmlWebapckPlugin({
      template: path.resolve(__dirname,'../public/index.html')
    })
  ],
  optimization:{
    splitChunks:{
      chunks:"all"
    },
    runtimeChunk:{
      name:entryPoint => `runtime~${entryPoint.name}`
    }
  },
  devServer: {
    open: true,
    host: "localhost",
    port: '5000',
    hot: true
  },
  // webpack解析文件时自动加载的选项
  resolve:{
    // 自动补全文件的扩展名
    extensions:['.jsx','js','json']
  },
  mode: "development",
  devtool: 'cheap-module-source-map'
}