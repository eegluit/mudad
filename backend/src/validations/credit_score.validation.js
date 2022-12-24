const Joi = require('joi');

const addProfile = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    gender: Joi.string().required(),
    profession: Joi.string().required(),
    employer: Joi.string().required(),
    employer_address: Joi.string().required(),
    monthly_income: Joi.number().required(),
  }),
};

module.exports = {
  addProfile,
};
