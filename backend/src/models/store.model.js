const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const storeSchema = mongoose.Schema(
  {
    isDeleted : {
      type: Boolean,
      default : false
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    lat: {
      type: String,
      required: true,
    },
    long: {
      type: String,
      required: true,
    },
    logo: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Document'
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
storeSchema.plugin(toJSON);
/**
 * @typedef store
 */
const store = mongoose.model('Store', storeSchema);

module.exports = store;
