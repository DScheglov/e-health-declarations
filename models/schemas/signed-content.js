'use strict';

const mongoose = require('mongoose');

const SignedContentSchema = mongoose.Schema({
  contentType: { type: String, required: true, descr: 'MIME-type of signed data' },
  content: { type: String, required: true, descr: 'The signed data' },
  signature: {
    type: String, required: true, descr: 'The digital signature of the data'
  },
  signatoryUrn: {
    type: String, required: true,
    descr: 'Unique resource name of the Party signed the content'
  }
}, { _id: false });

module.exports = exports = SignedContentSchema;
