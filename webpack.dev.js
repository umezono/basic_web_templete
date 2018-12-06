const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
  // watch: 'true',
  mode: 'development',
  devtool: 'source-map',
});