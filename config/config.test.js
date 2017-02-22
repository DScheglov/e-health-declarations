'use strict';
const commonConfig = require('./config.common');

module.exports = exports = Object.assign(commonConfig, {
  env: 'test',
  db: `mongodb://localhost/e-health`
});
