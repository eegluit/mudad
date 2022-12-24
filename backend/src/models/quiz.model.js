const { number } = require('joi');
const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const quizSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    quizData: {
      type: [],
      required: true,
    },
    quizAverage: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
quizSchema.plugin(toJSON);
/**
 * @typedef Quiz
 */
const quiz = mongoose.model('Quiz', quizSchema);

module.exports = quiz;
