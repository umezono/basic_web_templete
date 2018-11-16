'use strict';

export default class Setting {

  constructor() {
    this.srcDir = {
      'dir': 'src',
      'ejs': 'ejs',
      'assets': 'assets',
      'css': 'css',
      'js': 'js'
    }

    this.localDir = {
      'dir': 'dist-local',
      'assets': 'assets',
      'css': 'css',
      'js': 'js'
    }

    this.developmentDir = {
      'dir': 'dist-development',
      'assets': 'assets',
      'css': 'css',
      'js': 'js'
    }

    this.productionDir = {
      'dir': 'dist-production',
      'assets': 'assets',
      'css': 'css',
      'js': 'js'
    }
  };

  // static const srcDir = {
  //   'dir': 'src',
  //   'ejs': 'ejs',
  //   'assets': 'assets',
  //   'css': 'css',
  //   'js': 'js'
  // }
  //
  // static const localDir = {
  //   'dir': 'dist-local',
  //   'assets': 'assets',
  //   'css': 'css',
  //   'js': 'js'
  // }
  //
  // static const developmentDir = {
  //   'dir': 'dist-development',
  //   'assets': 'assets',
  //   'css': 'css',
  //   'js': 'js'
  // }
  //
  // static const productionDir = {
  //   'dir': 'dist-production',
  //   'assets': 'assets',
  //   'css': 'css',
  //   'js': 'js'
  // }

};