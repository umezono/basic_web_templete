'use strict';

import fs from 'fs';

import postcss from 'postcss';
import postcssrc from 'postcss-load-config';

import chalk from 'chalk';

import util from '../utils/util';

/**
* postcss.config.js argments
* https://github.com/michael-ciniawsky/postcss-load-config
*/
const ctx = {
  to: '', // Destination File Path
  form: '', // Source FIle Path
  map: false,
  parser: false,
  syntax: false,
  stringifier: false,
  env: ''
}

let cssCompile = (ctx, cssFile) => {

  postsccrc(ctx).then(({ plugins, options}) => {
    postcss(plugins)
      .process(cssFile, options)
      .then((result) => {
        console.log(result.css)
      })
  })

}

console.log(util);