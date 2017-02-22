'use strict';
const commonConfig = require('./config.common');

module.exports = exports = Object.assign(commonConfig, {
  env: 'production',
  db: `mongodb://mongodb-server/e-health`
});
