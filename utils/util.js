'use strict';

import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import globBase from 'glob-base';
import chalk from 'chalk';

export default class Util {

  constructor() {

  };

  /**
  * Get match files
  * @param {String} Serch string
  * @param {Object} Glob options
  * @return {Array<String>} Files
  */
  static getFiles(pattern, options) {
    glob(pattern, options, (er, files) => {
      if (er) {
        this.handleError('glob error', er);
        return;
      }

      return files;
    });
  };

  /**
  * Get synchronous match files
  * @param {String} Serch string
  * @return {Array<String>} Files
  */
  static getSyncFiles(pattern) {
    return glob.sync(pattern);
  };

  /**
  * Get config file
  * @param {String} Config file name
  * @return {String} Config file path
  */
  static getConfigFile(fileName) {
    let filePath = path.join(process.cwd(), 'configs', fileName);

    try {
      if (fs.statSync(filePath).isFile()) {
        return filePath;
      }
    } catch(e) {
      this.handleError('get config file error', e);
    }

    return filePath;
  };

  /**
  * Get dest path
  * @param {String} Glob pattern
  * @param {String} Dest folder name
  * @param {String} File path
  * @return {String} Dest path
  */
  static getDestPath(pattern, destFolder, filePath) {
    let globBaseStats = globBase(pattern);
    let fileExtName = path.extName(filePath);
    let fileBaseName = path.baseName(filePath, fileExtName);
    let fileDir = globBaseStats.replace('src', '');

    return path.join(destFolder, fileDir, `${fileBaseName}${fileExtName}`);
  };

  /**
  * ファイル読み込み関数
  * @param {string} Read file path(file name)
  * @return {string} Data in the file
  */
  static readFileSync(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (err, data) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(data);
      });
    });
  };

  /**
  * ファイルの書き込み関数
  * @param {string} File path(file name)
  * @param {data} File data
  */
  static writeFileSync(path, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, data, (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
      });
    });
  };

  /**
  * ファイルの追記関数
  * @param {string} File path(file name)
  * @param {data} File data
  */
  static appendFileSync(path, data) {
    return new Promise((resolve, reject) => {
      fs.appendFile(path, data, (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
      });
    });
  };

  /**
  * ファイルの削除関数
  * @param {string} File path(file name)
  */
  static unlinkSync(path) {
    return new Promise((resolve, reject) => {
      fs.unlink(path, (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
      });
    });
  };

  /**
  * 同期でのフォルダ作成
  * @param {string} File path(file name)
  */
  static mkdirpSync(path) {
    return new Promise((resolve, reject) => {
      fs.mkdirp(path, (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
      });
    });
  };

  /**
  * Error handle
  * @param {String} Before error message text
  */
  static handleError(text, e) {
    console.log(chalk.white.bold.bgRed(`${text} ${e.message}`));
  };

}