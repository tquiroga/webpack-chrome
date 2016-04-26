import makeWebpackConfig from './webpack/config';
import webpackDevServer from './webpack/server';
import overrideHotUpdater from './override'
import Manifest from './manifest'
import * as paths from './paths'

import path from 'path'
import fs from 'fs-extra';

// Override Webpack hot updater
overrideHotUpdater()

// Create manifest
const manifest = new Manifest({manifest: paths.manifest, build: paths.build})
manifest.run()

// Copy the locales directory in build
// Copy the locales directory
fs.copy(path.join(paths.src, "_locales"), path.join(paths.build, "_locales"), function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("Copy _locales: success!");
  }
});

// Start webpack dev server
const webpackConfig = makeWebpackConfig(manifest)
webpackDevServer(webpackConfig)
