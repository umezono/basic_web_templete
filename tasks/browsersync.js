'use strict';

const bs = require('browser-sync').create();
const path = require('path');

const bsConfig = require('../bs-config');

bs.init(bsConfig);