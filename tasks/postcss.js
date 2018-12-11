'use strict';

const fs = require('fs-extra');

const postcss = require('postcss');
const postcssrc = require('postcss-load-config');

const chokidar = require('chokidar');
const moment = require('moment');
const chalk = require('chalk');

const util = require('../utils/util');
const Setting = require('../configs/setting');

// Promise内の捕捉されなかった例外の詳細を表示
process.on('unhandledRejection', console.dir);

const setting = new Setting();

let cssFiles = util.getSyncFiles('src/**/*.css', 'src/**/_*.css');

let distDir, cssRootDistDir;

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

const cssCompile = async (ctx, cssFile, distPath) => {
  try {
    let data = await util.readFileSync(cssFile);

    // コンパイル、書き込み
    postcssrc(ctx).then(({ plugins, options }) => {
      postcss(plugins)
        .process(data, options)
        .then( async (result) => {
          try {
            await util.writeFileSync(distPath, result.css);
            // console.log(result);
          } catch (error) {
            util.handleError('css compile write', error);
          }
      })
    });
  } catch (error) {
    util.handleError('css compile', error);
  }
};

const readyComplie = async () => {
  try{
    let startTime = moment();

    await util.mkdirpSync(distDir);

    ctx.to = distDir;
    ctx.from = `${setting.srcDir.dir}/${setting.srcDir.assets}/${setting.srcDir.css}`;

    Promise.all(
      cssFiles.map((file) => {
        cssCompile(ctx, file, file.replace('src', cssRootDistDir));
      })
    ).then(() => {
      console.log(chalk.white.bold.bgMagenta(`css compile ${moment().diff(startTime)}ms`));
    });
  } catch (error) {
    util.handleError('css compile', error);
  }
};

(() => {

    if (process.env.NODE_ENV == 'local') {
      distDir = `${setting.localDir.dir}/${setting.localDir.assets}/${setting.localDir.css}`;
      cssRootDistDir = `${setting.localDir.dir}`;
    } else if ((process.env.NODE_ENV == 'development')) {
      distDir = `${setting.devDir.dir}/${setting.devDir.assets}/${setting.devDir.css}`;
      cssRootDistDir = `${setting.devDir.dir}`;
    } else if ((process.env.NODE_ENV == 'production')) {
      distDir = `${setting.prodDir.dir}/${setting.prodDir.assets}/${setting.prodDir.css}`;
      cssRootDistDir = `${setting.prodDir.dir}`;
    } else {
      console.log(chalk.white.bold.bgRed(`css not NODE_ENV`));
    }

    const watcher = chokidar.watch(`${setting.srcDir.dir}/${setting.srcDir.assets}/${setting.srcDir.css}`, {
      ignored: /.DS_Store/
    });

    // watch開始時の処理
    watcher.on('ready', () => {
      console.log(chalk.white.bold.bgBlue('css folder watching...'));

      readyComplie();

      // ファイル変更時の処理
      watcher.on('change', async (path) => {
        let searchString = 'common';
        let searchCommon = path.indexOf(searchString);

        // commonファイルが変更された場合は全てのcssファイルをコンパイル
        if (searchCommon != -1) {
          readyComplie();

          console.log(chalk.white.bold.bgBlue('change common file, all css file compile'));
        } else {
          cssCompile(ctx, path, path.replace('src', cssRootDistDir));

          console.log(chalk.white.bold.bgBlue(`${path} file compile`));
        }
      });

      // ファイルの追加、削除時の処理
      watcher.on('add', (path) => {
        watcher.add(path);

        fs.copySync(path, path.replace('src', cssRootDistDir));

        console.log(chalk.white.bold.bgBlue(`watcher add file ${path}`));
      }).on('unlink', (path) => {
        watcher.unwatch(path);

        fs.removeSync(path.replace('src', cssRootDistDir));

        console.log(chalk.white.bold.bgBlue(`watcher unlink file ${path}`));
      });

      // フォルダの追加、削除時の処理
      watcher.on('addDir', (path) => {
        watcher.add(path);

        fs.mkdirpSync(path.replace('src', cssRootDistDir));

        console.log(chalk.white.bold.bgBlue(`watcher add folder ${path}`));
      }).on('unlinkDir', (path) => {
        watcher.unwatch(path);

        fs.removeSync(path.replace('src', cssRootDistDir));

        console.log(chalk.white.bold.bgBlue(`watcher unlink folder ${path}`));
      });

      // watcher error
      watcher.on('error', (error) => {
        console.log(chalk.white.bold.bgRed(`css watcher ${error}`));
      });
    });

})();