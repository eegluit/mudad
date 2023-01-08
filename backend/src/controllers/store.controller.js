const newOtp = require('otp-generators');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { storeService } = require('../services');
const { tokenTypes } = require('../config/tokens');

const register = catchAsync(async (req, res) => {
    const storeRegister = await storeService.register(req);
    res.status(httpStatus.OK).send(storeRegister)
});

module.exports = {
  register,
};
