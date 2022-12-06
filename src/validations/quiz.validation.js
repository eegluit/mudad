const Joi = require('joi');
const { password } = require('./custom.validation');

const addQuiz = {
    body: Joi.object().keys({
        quizData: Joi.array().required()
    }),
};

module.exports = {
  addQuiz,
};
