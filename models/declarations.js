'use strict';

const mongoose = require('mongoose');

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
  partyUrn: {
    type: String,
    pattern: /[0-9a-fA-F]{16, 32}/,
    required: true,
    description: 'Unique resource name of the Party should be reinbursed'
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
    type: {
      signedData: {
        type: String,
        required: true,
        description: 'Plain text of personalized declaration that is signed'
      },
      data: {
        type: String,
        pattern: /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/,
        required: true,
        description: 'The base64 encoded date of e-signature'
      },
      signatoryUrn: {
        type: String,
        pattern: /[0-9a-fA-F]{16, 32}/,
        required: true,
        description: 'Unique resource name of the Party accept the Declaration'
      }
    },
    description: 'The signature of plain text declaration made by Party that accept the Declaration from Patient'
  },
  data: {
    type: String,
    pattern: /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/,
    description: 'The base64-encoded data with scan/photo of Declaration document'
  },
  statusDate: {
    type: Date, 'default': Date.now,
    description: 'The date-time of the current status'
  },
  actualSince: {
    type: Date,
    description: 'The date-time when the Declaration has become to be actual' },
  actualTo: {
    type: Date,
    description: 'The date-time when the Declaration shoud or has become to be closed or prolongated'
  }
});

const Declaration = mongoose.model('Declaration', DeclarationSchema);

module.exports = exports = Declaration;
