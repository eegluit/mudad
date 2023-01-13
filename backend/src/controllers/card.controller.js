const newOtp = require('otp-generators');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { cardService } = require('../services');
const { tokenTypes } = require('../config/tokens');
const ApiError = require('../utils/ApiError');

const addCard = catchAsync(async (req, res) => {
  const cardData = await cardService.addCardByUserId(req.user, req.body);
  res.status(httpStatus.OK).send({message : 'Card added successfully'});
});

const getCard = catchAsync(async (req, res) => {
    const cardData = await cardService.getCardByUserId(req.user);
    res.status(httpStatus.OK).send({cardData});
});

module.exports = {
  addCard,
  getCard
};
