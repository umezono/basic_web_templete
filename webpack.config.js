'use strict';

const path = require('path');

module.export = {
  mode: 'none',
  devtool: 'source-map',
  entry: ['@babel/polyfill', './src/assets/js/index.js'], // polyfillはIE11などで必要
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist-local/assets/js/')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        excude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};