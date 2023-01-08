const Joi = require('joi');
const { password } = require('./custom.validation');

const addIdType = {
  body: Joi.object().keys({
    kycIdType: Joi.string().required(),
  }),
};

const getKycDetails = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

const updateKycDetails = {
  body: Joi.object().keys({
    id: Joi.string().required(),
    status: Joi.string().required()
  }),
};

module.exports = {
  addIdType,
  getKycDetails,
  updateKycDetails
};
