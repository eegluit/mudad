const Joi = require('joi');

const addCard = {
  body: Joi.object().keys({
    cardHolderName: Joi.string().required(),
    cardNumber: Joi.string().required(),
    expiryDate: Joi.string().required(),
  }),
};

module.exports = {
  addCard,
};