'use strict';

import Setting from './setting';

export default class Meta {

  constructor() {
    this.setting = new Setting();

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
      image: `${this.setting.location.host}/assets/images/shared/ogp-1.png`,
      url: `${this.setting.location.host}`,
      type: 'type',
      site_name: 'og site_name',
      fb_app_id: 'id',
      tw_account: 'twitterアカウントのユーザー名'
    }

  };

}