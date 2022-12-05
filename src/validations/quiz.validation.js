const Joi = require('joi');
const { password } = require('./custom.validation');

const addQuiz = {
    query: Joi.object().keys({
        token: Joi.string().required(),
        }),
    body: Joi.object().keys({
        quizData: Joi.array().required()
    }),
};

module.exports = {
  addQuiz,
};
