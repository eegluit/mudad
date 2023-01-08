const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const kycSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    kycIdType: {
      type: String
    },
    kycDoc: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Document'
    },
    selfie: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Document'
    },
    status : {
      type : String
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
kycSchema.plugin(toJSON);
/**
 * @typedef kyc
 */
const kyc = mongoose.model('Kyc', kycSchema);

module.exports = kyc;
