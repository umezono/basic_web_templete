'use strict';

const fs = require('fs-extra');

const postcss = require('postcss');
const postcssrc = require('postcss-load-config');

const moment = require('moment');
const chalk = require('chalk');

const util = require('../utils/util');
const Setting = require('../configs/setting');

/**
* postcss.config.js argments
* https://github.com/michael-ciniawsky/postcss-load-config
*/
let ctx = {
  to: '', // Destination File Path
  from: '', // Source FIle Path
  map: 'inline',
  parser: false,
  syntax: false,
  stringifier: false
};

const cssCompile = async (ctx, cssFile, destPass) => {
  try {
    let data = await util.readFileSync(cssFile);

    // console.log(ctx);

    // コンパイル、書き込み
    postcssrc(ctx).then(({ plugins, options }) => {
      postcss(plugins)
        .process(data, options)
        .then( async (result) => {
          try {
            await util.writeFileSync(destPass, result.css);
            // console.log(result);
          } catch (error) {
            util.handleError('css compile write', error);
          }
        })
    });
  } catch (error) {
    util.handleError('css compile read', error);
  }
};

(async () => {

    const setting = new Setting();

    let cssFiles = util.getSyncFiles('src/**/*.css', 'src/**/_*.css');

    try{
      if (process.env.NODE_ENV == 'local') {

        await util.mkdirpSync(`${setting.localDir.dir}/${setting.localDir.assets}/${setting.localDir.css}`);

        ctx.to = `${setting.localDir.dir}/${setting.localDir.assets}/${setting.localDir.css}`;
        ctx.from = `${setting.srcDir.dir}/${setting.srcDir.assets}/${setting.srcDir.css}`;

        cssFiles.forEach((file) => {
          cssCompile(ctx, file, file.replace('src', `${setting.localDir.dir}`));
        });

      } else if ((process.env.NODE_ENV == 'development')) {

      } else if ((process.env.NODE_ENV == 'production')) {

      } else {
        console.log(chalk.white.bold.bgRed(`css not NODE_ENV`));
      }
    } catch (error) {
      util.handleError('css compile', error);
    }

    console.log(chalk.white.bold.bgBlue(`css compile time ${moment().format('YYYY-MM-DD HH:mm:ss')}`));

    // console.log(cssFiles);

})();