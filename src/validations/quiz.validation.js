const Joi = require('joi');

const addQuiz = {
  body: Joi.object().keys({
    quizData: Joi.array().required(),
  }),
};

module.exports = {
  addQuiz,
};
