'use strict';

import fs from 'fs-extra';

import ejs from 'ejs';

import moment from 'moment';
import chalk from 'chalk';

import util from '../utils/util';
import Setting from '../configs/setting';

/**
* ejs options object
* https://ejs.co/
*/
let options = {
  delimiter: '@'
};

const ejsCompile = (file, data, options) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(file, data, options, (err, str) => {
        if (err) {
          reject(err);
          return;
        }
        // str => Rendered HTML string
        resolve(str);
    });
  });
}

(async () => {

    const setting = new Setting();

    let ejsFiles = util.getSyncFiles('src/**/*.ejs', 'src/**/_*.ejs');

    try{
      if (process.env.NODE_ENV == 'local') {

        ejsFiles.forEach(async (file) => {
          let dist = await util.getDistPath(file, `${setting.localDir.dir}`).replace('/view', '');

          await util.mkdirpSync(dist);

          let renderHTML = await ejsCompile(file, {}, options);

          await util.writeFileSync(file.replace('src/view', `${setting.localDir.dir}`).replace('ejs', 'html'), renderHTML);
        });

      } else if ((process.env.NODE_ENV == 'development')) {

      } else if ((process.env.NODE_ENV == 'production')) {

      } else {
        console.log(chalk.white.bold.bgRed(`ejs not NODE_ENV`));
      }
    } catch (error) {
      util.handleError('ejs compile', error);
    }

    console.log(chalk.white.bold.bgBlue(`ejs compile time ${moment().format('YYYY-MM-DD HH:mm:ss')}`));

    // console.log(cssFiles);

})();