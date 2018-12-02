'use strict';

import browserSync from 'browser-sync';
import path from 'path';

const bs = browserSync.create();

bs.watch(`${process.cwd()}/dist-local/**`).on("change", bs.reload);

bs.init({
  // https: true,
  port: 3000,
  server: `${process.cwd()}/dist-local`,
  files: `${process.cwd()}/dist-local/**/*`
  // files: path.join(`${process.cwd()}/dist-local`, '/**/+(*.html|*.js|*.css)')
  // "browser": ["firefox", "chrome"],
});