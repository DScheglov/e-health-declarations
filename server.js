'use strict';

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const config = require('./config');
const api = require('./api');


mongoose.Promise = global.Promise;
mongoose.connect(config.db);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

app.use(config.apiPath, api);

app.listen(config.port, function(){
  console.log(`Express server is listening on port ${config.port}`);
});
