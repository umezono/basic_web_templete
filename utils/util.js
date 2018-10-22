'use strict';

import path from 'path';
import fs from 'fs';
import glob from 'glob';
import globBase from 'glob-base';

export default class Util {

  constructor() {

  };

  /**
  * get match files
  * @param {String} serch string
  * @param {Object} glob options
  * @return {Array<String>} files
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
  * get synchronous match files
  * @param {String} serch string
  * @return {Array<String>} files
  */
  static getSyncFiles(pattern) {
    return glob.sync(pattern);
  };

  /**
  * get config file
  * @param {String} config file name
  * @return {String} config file path
  */
  static getConfigFile(fileName) {
    let filePath = path.join(process.cwd(), configs, fileName);

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
  * destPath
  * @param {String} glob pattern
  * @param {String} dest folder name
  * @param {String} file path
  * @return {String} dest path
  */
  static destPath(pattern, destFolder, filePath) {
    let globBaseStats = globBase(pattern);
    let fileExtName = path.extName(filePath);
    let fileBaseName = path.baseName(filePath, fileExtName);
    let fileDir = globBaseStats.replace('src', '');

    return path.join(destFolder, fileDir, `${fileBaseName}${fileExtName}`);
  }

  /**
  * error handle
  * @param {String} before error message text
  */
  static handleError(text, e) {
    console.log( chalk.red(`${text} ${e.message}`) );
  };

}