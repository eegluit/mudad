const newOtp = require('otp-generators');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { storeService } = require('../services');
const { tokenTypes } = require('../config/tokens');

const register = catchAsync(async (req, res) => {
    const storeRegister = await storeService.register(req);
    res.status(httpStatus.OK).send(storeRegister)
});

const getStore = catchAsync(async (req, res) => {
  const store = await storeService.findAllStore();
  let storeData = [];
  for await(const value of store) {
    storeData.push({
      name : value.name,
      logo : `https://admin.mudad.space/static/docs/store/${value.logo.document}`
    });
  }
  res.status(httpStatus.OK).send({storeData});
});

module.exports = {
  register,
  getStore
};
