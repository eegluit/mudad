const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const documentsSchema = mongoose.Schema(
  {
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    document: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
documentsSchema.plugin(toJSON);

/**
 * @typedef documents
 */
const documents = mongoose.model('Document', documentsSchema);

module.exports = documents;