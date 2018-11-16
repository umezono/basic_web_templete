'use strict';

import path from 'path';
import fs from 'fs';
import glob from 'glob';
import globBase from 'glob-base';

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
    })
  }

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
  }

  /**
  * ファイル読み込み関数
  * @param {string} Read file path(file name)
  * @return {string} Data in the file
  */
  static readFile(path) {
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) {
          throw chalk.bgRed(err);
      }

      return data;
    });
  }

  /**
  * ファイルの書き込み関数
  * @param {string} File path(file name)
  * @param {data} File data
  */
  static writeFile(path, data) {
    fs.writeFile(path, data, function (err) {
      if (err) {
          throw chalk.bgRed(err);
      }
    });
  }

  /**
  * ファイルの追記関数
  * @param {string} File path(file name)
  * @param {data} File data
  */
  static appendFile(path, data) {
    fs.appendFile(path, data, function (err) {
      if (err) {
          throw err;
      }
    });
  }

  /**
  * ファイルの削除関数
  * @param {string} File path(file name)
  */
  static unlink(path) {
    fs.unlink(path, function (err) {
      if (err) {
          throw err;
      }
    });
  }

  /**
  * Error handle
  * @param {String} Before error message text
  */
  static handleError(text, e) {
    console.log( chalk.bgRed(`${text} ${e.message}`) );
  };

}