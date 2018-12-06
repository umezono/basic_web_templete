export default class Test {
  constructor() {
    this._init();
  }

  _init() {
    console.log('hoge');

    if (process.env.NODE_ENV != 'local') {
      console.log('fugafuga');
    }
  }
}