const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const profileSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    employer: {
      type: String,
      required: true,
    },
    employer_address: {
      type: String,
      required: true,
    },
    monthly_income: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
profileSchema.plugin(toJSON);
/**
 * @typedef profile
 */
const profile = mongoose.model('Profile', profileSchema);

module.exports = profile;
