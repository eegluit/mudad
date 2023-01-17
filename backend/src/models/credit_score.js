const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const creditScoreSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    credit_score: {
      type: Number,
      required: true,
    },
    available_credit: {
      type: Number
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
creditScoreSchema.plugin(toJSON);
/**
 * @typedef Credit_Score
 */
const creditScore = mongoose.model('Credit_Score', creditScoreSchema);

module.exports = creditScore;
