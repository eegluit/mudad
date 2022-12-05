const httpStatus = require('http-status');
const { Quiz } = require('../models');
const ApiError = require('../utils/ApiError');

const addQuiz = async (quizData) => {
  const quizRes = await Quiz.create(quizData);
  return quizRes;
};

module.exports = {
  addQuiz,
};
