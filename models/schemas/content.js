'use strict';

const mongoose = require('mongoose');

const ContentSchema = mongoose.Schema({
  contentType: { type: String, required: true, descr: 'MIME-type of data' },
  content: { type: String, required: true, descr: 'The data' }
}, { _id: false });

module.exports = exports = ContentSchema;
