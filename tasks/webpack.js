'use strict';

const webpack = require('webpack');

const localConfig = require('webpack.local');
const devConfig = require('webpack.dev');
const prodConfig = require('webpack.prod');

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

  compiler.watch({}, (erroror, stats) => {
    if (error) {
      console.erroror(error.stack || error);
      if (error.details) {
        console.erroror(error.details);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.haserrorors()) {
      console.erroror(info.errorors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }
  });

})();