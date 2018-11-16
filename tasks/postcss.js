'use strict';

import fs from 'fs';

import postcss from 'postcss';
import postcssrc from 'postcss-load-config';

import mkdirp from 'mkdirp';
import moment from 'moment';
import chalk from 'chalk';

import util from '../utils/util';
import Setting from '../configs/setting';

/**
* postcss.config.js argments
* https://github.com/michael-ciniawsky/postcss-load-config
*/
let ctx = {
  to: '', // Destination File Path
  form: '', // Source FIle Path
  map: false,
  parser: false,
  syntax: false,
  stringifier: false
}

let cssCompile = (ctx, cssFile, destPass) => {

  postcssrc(ctx).then(({ plugins, options}) => {
    postcss(plugins)
      .process(cssFile, options)
      .then((result) => {
        util.writeFile(destPass, result);
        // console.log(result.css)
      })
  })

}

let destCss = async () => {

  const setting = new Setting();

  let nowDate = moment().format('YYYY-MM-DD HH:mm:ss');

  let cssFiles = await util.getSyncFiles('src/**/*.css');

  if (process.env.NODE_ENV == 'local') {

    mkdirp(`${setting.localDir.dir}/${setting.localDir.assets}/${setting.localDir.css}`, (error) => {
      if (error) {
        util.handleError('local css dir', error);
      } else {
        console.log(chalk.bgBlue('success local css dir'));
      }
    });

    ctx = {
      to: `${setting.localDir.dir}/${setting.localDir.assets}/${setting.localDir.css}`,
      form: `${setting.srcDir.dir}/${setting.srcDir.assets}/${setting.srcDir.css}`,
      map: 'inline'
    }

    await cssFiles.forEach((file) => {
      cssCompile(ctx, file, file.replace('src', `${setting.localDir.dir}`));
    });

  } else if ((process.env.NODE_ENV == 'development')) {

  } else if ((process.env.NODE_ENV == 'production')) {

  } else {
    console.log( chalk.bgRed(`css not NODE_ENV`) );
  }

  let elapsedTime = moment(nowDate, 'YYYY-MM-DD HH:mm:ss').fromNow();

  console.log(chalk.bgBlue(`css compile time ${elapsedTime}`));

  console.log(cssFiles);
};

destCss();

// console.log(util);

