'use strict';

// import browserSync from 'browser-sync';
// import path from 'path';

// const bs = browserSync.create();

const bs = require('browser-sync').create();
const path = require('path');

const bsConfig = require('../bs-config');
// import bsConfig from '../bs-config';

bs.init(bsConfig);