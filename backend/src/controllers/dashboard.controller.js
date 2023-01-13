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

  if(Object.keys(creditScoreData).length == 0 ) {
    console.log('called')
    throw new ApiError(httpStatus.NOT_FOUND, 'Available credit is not found');
  }
  let availableLimitData = {
   availableLimit :  creditScoreData.available_credit,
   isKyc : isKyc ? isKyc.selfie ? true : false : false 
  }
  res.status(httpStatus.OK).send(availableLimitData);
});

module.exports = {
  getDashboard
};
