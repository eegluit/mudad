const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const cardSchema = mongoose.Schema(
  {
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    isDeleted : {
        type: Boolean,
        default : false
    },
    cardHolderName: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true
    },
    expiryDate: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
cardSchema.plugin(toJSON);

/**
 * @typedef card
 */
const card = mongoose.model('Card', cardSchema);

module.exports = card;