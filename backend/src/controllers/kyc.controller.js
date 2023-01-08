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

const getKycDetails = catchAsync(async (req, res) => {
  const kycData = await kycService.findByUserId(req.body.userId);
  const kyc = {
    id: kycData._id,
    idType : kycData.kycIdType,
    kycDoc : kycData.kycDoc ? `http://13.232.39.141:8080/static/docs/kyc/${kycData.kycDoc.document}` : null,
    selfie : kycData.selfie ? `http://13.232.39.141:8080/static/docs/kyc/${kycData.selfie.document}` : null
  }
  res.status(httpStatus.OK).send({response : kyc})
});

const updateKycDetails = catchAsync(async (req, res) => {
  const kycData = await kycService.findByIdAndUpdate(req.body.id, req.body.status);
  let message = 'Kyc rejected successfully';
  if(req.body.status == 'Verified') {
    message = 'Kyc verified successfully';
  }
  res.status(httpStatus.OK).send({message})
});

module.exports = {
  addIdType,
  uploadKycDoc,
  uploadSelfie,
  getKycDetails,
  updateKycDetails
};
