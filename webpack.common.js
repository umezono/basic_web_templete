const webpack = require('webpack');

const path = require('path');

module.exports = {
  // polyfillはIE11などで必要
  entry: {
    // head: ['@babel/polyfill', './src/assets/js/head.js'],
    // app: ['@babel/polyfill', './src/assets/js/index.js']
    head: './src/assets/js/head.js',
    app: './src/assets/js/index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // ローダーのオプション
          // 今回はbabel-loaderを利用しているため
          // babelのオプションを指定しているという認識で問題ない
          options: {
            presets: ["@babel/preset-env"],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        // enforce: 'pre'を指定することによって
        // enforce: 'pre'がついていないローダーより早く処理が実行される
        // 今回はbabel-loaderで変換する前にコードを検証したいため、指定が必要
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        // glslファイルの中でimportが使用できる
        // https://www.npmjs.com/package/glslify-import-loader
        test: /\.(glsl|frag|vert)$/,
        exclude: /node_modules/,
        loader: 'glslify-import-loader'
      },
      {
        test: /\.(glsl|frag|vert)$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      },
      {
        // https://github.com/glslify/glslify-loader
        test: /\.(glsl|frag|vert)$/,
        exclude: /node_modules/,
        loader: 'glslify-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css']
  },
  // プラグインの設定
  plugins: [
    new webpack.ProvidePlugin({
      // $: 'jquery',
      // jQuery: 'jquery',
      // Promise : 'es6-promise',
    }),
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
    ]),
  ]
};