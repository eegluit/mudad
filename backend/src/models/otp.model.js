const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const otpSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    module: {
      type: String,
    //  required: true,
    },
    status: {
      type: String,
      enum: ['verified', 'pending'],
      default: 'pending',
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    expiresAt: {
      type: Date,
    },
    resendCount: {
      type: Number,
      default: 0,
    },
    token: {
      type: String,
     // required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
otpSchema.plugin(toJSON);
/**
 * @typedef Otp
 */
const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;
