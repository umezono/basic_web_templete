const webpack = require('webpack');

const path = require('path');

module.exports = {
  // polyfillはIE11などで必要
  entry: {
    head: ['@babel/polyfill', './src/assets/js/head.js'],
    app: ['@babel/polyfill', './src/assets/js/index.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        excude: /node_modules/,
        use: {
          loader: 'babel-loader'
          // ローダーのオプション
          // 今回はbabel-loaderを利用しているため
          // babelのオプションを指定しているという認識で問題ない
          options: {
            ["@babel/preset-env", {
              modules: false
            }]
          }
        }
      },
      {
        // enforce: 'pre'を指定することによって
        // enforce: 'pre'がついていないローダーより早く処理が実行される
        // 今回はbabel-loaderで変換する前にコードを検証したいため、指定が必要
        enforce: 'pre',
        test: /\.js$/,
        excude: /node_modules/,
        loader: 'eslint-loader',
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  // プラグインの設定
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
    ]),
  ]
};