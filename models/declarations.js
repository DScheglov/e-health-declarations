'use strict';

const mongoose = require('mongoose');
const SignedContentSchema = require('./schemas/signed-content');
const ContentSchema = require('./schemas/content')

const STATUSES = [
  'draft',          // the new version of declaration
  'verification',   // the declaration is on stage of signature verification
  'confirmation',   // the patient confirmation is expected
  'actual',         // the declaration is actual
  'closed'          // the declaration is unactual (see statusReason)
];

const REASONS = [
  'invalid signature',    // the digital signature couldb't be accepted
  'rejected',             // the patient didn't confirm the declaration
  'revoked',              // the patiant revoked the declaration
  'overdue',              // the term of declaration is expired
  'prolongated'           // the term of declaration was renewed
];

const SCOPES = [
  'basic medical help',
  'primary medical help',
  'secondary medical help'
]

const DeclarationSchema = new mongoose.Schema({
  patientUrn: {
    type: String,
    pattern: /[0-9a-fA-F]{16, 32}/,
    required: true,
    description: 'Unique resource name of Patient'
  },
  doctorUrn: {
    type: String,
    pattern: /[0-9a-fA-F]{16, 32}/,
    required: true,
    description: 'Unique resource name of Doctor'
  },
  contractUrn: {
    type: String,
    pattern: /[0-9a-fA-F]{16, 32}/,
    required: true,
    description: 'Unique resource name of the Reinbursment contract'
  },
  scope: {
    type: String,
    enum: SCOPES,
    required: true,
    description: `The scope of medical help.`,
    'default': SCOPES[0]
  },
  status: {
    type: String,
    enum: STATUSES,
    required: true,
    description: `The status of the declaration.`,
    'default': STATUSES[0]
  },
  signature: {
    type: SignedContentSchema,
    description: 'The signed plain text declaration made by Party that accept the Declaration from Patient'
  },
  images: {
    type: [ ContentSchema ],
    description: 'The array of base64-encoded data with scan/photo of Declaration document'
  },
  statusDate: {
    type: Date, 'default': Date.now,
    description: 'The date-time of the current status'
  },
  actualSince: {
    type: Date,
    description: 'The date-time when the Declaration has become actual' },
  actualTo: {
    type: Date,
    description: 'The date-time when the Declaration shoud or has become to be closed or prolongated'
  }
});

const Declaration = mongoose.model('Declaration', DeclarationSchema);

module.exports = exports = Declaration;
