const Joi = require('joi');
const { password } = require('./custom.validation');

const addIdType = {
  body: Joi.object().keys({
    kycIdType: Joi.string().required(),
  }),
};

module.exports = {
  addIdType,
};
