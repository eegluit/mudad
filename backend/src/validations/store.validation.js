const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().required(),
    lat: Joi.string().required(),
    long: Joi.string().required(),
    documentName: Joi.string().required()
  }),
};

module.exports = {
  register,
};