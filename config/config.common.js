'use strict';
const utils = require('./utils');

module.exports = exports = Object.assign(
  utils.require_safe('./host.json') || { host: 'localhost' }, {
  env: null,
  apiTitle: 'E-Health Patient-Doctor consent declaration',
  apiPath: '/api/v1',
  port: 8888
});
