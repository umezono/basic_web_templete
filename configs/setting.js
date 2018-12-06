'use strict';

export default class Setting {

  constructor() {
    this._init();
  };

  _init() {
    this.srcDir = {
      dir: 'src',
      ejs: 'view',
      assets: 'assets',
      css: 'css',
      js: 'js'
    };

    this.localDir = {
      dir: 'dist-local',
      assets: 'assets',
      css: 'css',
      js: 'js'
    };

    this.developmentDir = {
      dir: 'dist-development',
      assets: 'assets',
      css: 'css',
      js: 'js'
    };

    this.productionDir = {
      dir: 'dist-production',
      assets: 'assets',
      css: 'css',
      js: 'js'
    };

    /**
    * Location
    */
    if (process.env.NODE_ENV == 'local') {

      this.location = {
        protocol: 'http:',
        hostname: '//127.0.0.1',
        port: ':3000'
      };

      this.location.host = `${this.location.protocol}${this.location.hostname}${this.location.port}`;

      this.location.root = `${this.location.protocol}${this.location.hostname}`;

    } else if (process.env.NODE_ENV == 'development') {

      this.location = {
        protocol: 'https:',
        hostname: '//hogehoge.com',
        port: ':8000'
      };

      this.location.host = `${this.location.protocol}${this.location.hostname}${this.location.port}`;

      this.location.root = `${this.location.protocol}${this.location.hostname}`;

    } else if (process.env.NODE_ENV == 'production') {
      this.location = {
        protocol: 'https:',
        hostname: '//fugafuga.com',
        port: ''
      };

      this.location.host = `${this.location.protocol}${this.location.hostname}${this.location.port}`;

      this.location.root = `${this.location.protocol}${this.location.hostname}`;
    }
  };

};