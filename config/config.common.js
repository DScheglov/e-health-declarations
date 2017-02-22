'use strict';
const utils = require('./utils');
const hostInfo = require('../../host.json');

module.exports = exports = Object.assign(
  utils.require_safe('../../host.json') || { host: 'localhost' }, {
  env: null,
  apiTitle: 'E-Health Patient-Doctor consent declaration',
  apiPath: '/api/v1',
  port: 8888
});
