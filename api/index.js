'use strict';

const merest = require('merest-swagger');
const config = require('../config');
const models = require('../models');

const api = new merest.ModelAPIExpress({
  title: config.apiTitle,
  path: config.apiPath,
  host: `${config.host}:${config.apiPort || config.port}`,
  options: false
});

api.expose(models.Declaration, {
  queryFields: { },
  search: {
    fields: '-signature -images'
  },
  options: false
});

api.exposeSwaggerUi({
  beautify: true
})

module.exports = exports = api;
