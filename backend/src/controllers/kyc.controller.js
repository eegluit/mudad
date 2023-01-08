const newOtp = require('otp-generators');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { kycService } = require('../services');
const { tokenTypes } = require('../config/tokens');

const addIdType = catchAsync(async (req, res) => {
    const addId = await kycService.addIdType(req);
    res.status(httpStatus.OK).send(addId)
});

const uploadKycDoc = catchAsync(async (req, res) => {
  // try {
    await kycService.uploadKycDoc(req);
    res.status(200).send({ message: 'Document uploaded successfully' });
  // } catch (err) {
  //   console.log(err)
  //   res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Something went wrong' });
  // }
});

const uploadSelfie = catchAsync(async (req, res) => {
  // try {
    await kycService.uploadSelfie(req);
    res.status(200).send({ message: 'Selife uploaded successfully' });
  // } catch (err) {
  //   console.log(err)
  //   res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Something went wrong' });
  // }
});

module.exports = {
  addIdType,
  uploadKycDoc,
  uploadSelfie
};
