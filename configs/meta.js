'use strict';

export default class Meta {

  constructor() {
    this._init();
  };

  _init() {

    this.common = {
      keywords: 'keywords',
      description: 'description',
      copyright: 'copyright',
    }

    this.og = {
      title: 'og title',
      description: 'og description',
      keywords: 'og keywords',
      image: `/assets/hoge.jpg`,
      url: `https://hoge.com`,
      type: 'type',
      site_name: 'og site_name',
      fb_app_id: 'id',
      tw_account: 'twitterアカウントのユーザー名'
    }

  };

}