'use strict';

const chalk = require('chalk');
const webpack = require('webpack');

const localConfig = require('../webpack.local');
const devConfig = require('../webpack.dev');
const prodConfig = require('../webpack.prod');

(() => {

  let config;

  if (process.env.NODE_ENV === 'local') {
    config = localConfig;
  } else if (process.env.NODE_ENV === 'development') {
    config = devConfig;
  } else if (process.env.NODE_ENV === 'production') {
    config = prodConfig;
  }

  const compiler = webpack(config);

  compiler.watch({
    ignored: /node_modules/
  }, (error, stats) => {
    if (error) {
      console.error(chalk.white.bold.bgRed(error.stack || error));
      if (error.details) {
        console.error(chalk.white.bold.bgRed(error.details));
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(chalk.white.bold.bgRed(info.error));
    }

    if (stats.hasWarnings()) {
      console.warn(chalk.white.bold.bgYellow(info.warnings));
    }
  });

})();