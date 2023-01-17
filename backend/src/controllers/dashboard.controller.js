const newOtp = require('otp-generators');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { creditScoreService, kycService } = require('../services');
const { tokenTypes } = require('../config/tokens');
const ApiError = require('../utils/ApiError');

const getDashboard = catchAsync(async (req, res) => {
  const creditScoreData = await creditScoreService.getCreditScoreByUserId(req.user);
  console.log(creditScoreData)
  const isKyc = await kycService.findByUserId(req.user);

  let availableLimitData = {
   availableLimit :  creditScoreData ? creditScoreData.available_credit : 0,
   isKyc : isKyc ? isKyc.selfie ? true : false : false 
  }
  res.status(httpStatus.OK).send(availableLimitData);
});

module.exports = {
  getDashboard
};
