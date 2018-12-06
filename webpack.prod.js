const path = require('path');

const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const LicenseInfoWebpackPlugin = require('license-info-webpack-plugin').default;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(commonConfig, {
  mode: 'production',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist-prod/assets/js/')
  },
  plugins: [
    new LicenseInfoWebpackPlugin({
      glob: '{LICENSE,license,License}*'
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        uglifyOptions: {
          compress: {drop_console: true}
        }
      })
    ]
  }
});