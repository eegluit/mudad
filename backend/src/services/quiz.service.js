const { Quiz } = require('../models');

const addQuiz = async (quizData) => {
  const quizRes = await Quiz.create(quizData);
  return quizRes;
};

module.exports = {
  addQuiz,
};
