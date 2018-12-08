'use strict';

const fs = require('fs-extra');

const ejs = require('ejs');

const chokidar = require('chokidar');
const moment = require('moment');
const chalk = require('chalk');

const util = require('../utils/util');
const Setting = require('../configs/setting');
const Meta = require('../configs/meta');

const meta = new Meta();
const setting = new Setting();

const ejsFiles = util.getSyncFiles('src/**/*.ejs', 'src/**/_*.ejs');

let distDir;

const data = {
  rootPath: process.cwd(),
  meta: meta,
  setting: setting
};

/**
* ejs options object
* https://ejs.co/
*/
const options = {
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

const readyComplie = () => {
  try {
    let startTime = moment();

    Promise.all(ejsFiles.map(
      async (file) => {
        let dist = await util.getDistPath(file, distDir).replace(`/${setting.srcDir.ejs}`, '');

        await util.mkdirpSync(dist);

        let renderHTML = await ejsCompile(file, data, options);

        await util.writeFileSync(file.replace(`${setting.srcDir.dir}/${setting.srcDir.ejs}`, distDir).replace('ejs', 'html'), renderHTML);
      })
    ).then(() => {
      console.log(chalk.white.bold.bgMagenta(`ejs compile ${moment().diff(startTime)}ms`));
    });
  } catch (error) {
    util.handleError('ejs compile', error);
  }
}

(() => {

    if (process.env.NODE_ENV == 'local') {
      distDir = `${setting.localDir.dir}`;
    } else if ((process.env.NODE_ENV == 'development')) {
      distDir = `${setting.devDir.dir}`;
    } else if ((process.env.NODE_ENV == 'production')) {
      distDir = `${setting.prodDir.dir}`;
    } else {
      console.log(chalk.white.bold.bgRed(`ejs not NODE_ENV`));
    }

    const watcher = chokidar.watch(`${setting.srcDir.dir}/${setting.srcDir.ejs}`, {
      ignored: /.DS_Store/
    });

    // watch開始時の処理
    watcher.on('ready', () => {
      console.log(chalk.white.bold.bgBlue('ejs folder watching...'));

      readyComplie();

      // ファイル変更時の処理
      watcher.on('change', async (path) => {
        let searchString = 'common';
        let searchCommon = path.indexOf(searchString);

        // commonファイルが変更された場合は全てのejsファイルをコンパイル
        if (searchCommon != -1) {
          readyComplie();

          console.log(chalk.white.bold.bgBlue('change common file, all ejs file compile'));
        } else {
          let renderHTML = await ejsCompile(path, data, options);

          await util.writeFileSync(path.replace(`${setting.srcDir.dir}/${setting.srcDir.ejs}`, distDir).replace('ejs', 'html'), renderHTML);

          console.log(chalk.white.bold.bgBlue(`${path} file compile`));
        }
      });

      // ファイルの追加、削除時の処理
      watcher.on('add', (path) => {
        watcher.add(path);
        console.log(chalk.white.bold.bgBlue(`watcher add file ${path}`));
      }).on('unlink', (path) => {
        watcher.unwatch(path);
        console.log(chalk.white.bold.bgBlue(`watcher unlink file ${path}`));
      });

      // フォルダの追加、削除時の処理
      watcher.on('addDir', (path) => {
        watcher.add(path);
        console.log(chalk.white.bold.bgBlue(`watcher add folder ${path}`));
      }).on('unlinkDir', (path) => {
        watcher.unwatch(path);
        console.log(chalk.white.bold.bgBlue(`watcher unlink folder ${path}`));
      });

      // watcher error
      watcher.on('error', (error) => {
        console.log(chalk.white.bold.bgRed(`ejs watcher ${error}`));
      });
    });

})();