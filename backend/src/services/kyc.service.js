const httpStatus = require('http-status');
const { Kyc, Document } = require('../models');
const ApiError = require('../utils/ApiError');

const addIdType = async (req) => {
  const kycData = await Kyc.findOne({userId : req.user});
  if(kycData) {
    await Kyc.findOneAndUpdate({_id:kycData._id}, {$set: {kycIdType: req.body.kycIdType}});
    return {message : 'Id type updated successfully'};
  } else {
    req.body.userId = req.user;
    await Kyc.create(req.body);
    return {message : 'Id type added successfully'};
  }
};

const uploadKycDoc = async (req) => {
    let docsBody = {
        createdBy : req.user,
        document : req.body.documentName
    }
    console.log('called', docsBody)
    const uploadDocs = await Document.create(docsBody);
    const kycUpdate = await Kyc.findOneAndUpdate({userId: req.user}, {$set: {kycDoc: uploadDocs._id}});
    return {success: true, message: 'Kyc updated successfully'};
};

const uploadSelfie = async (req) => {
    let docsBody = {
        createdBy : req.user,
        document : req.body.documentName
    }
    const uploadDocs = await Document.create(docsBody);
    const kycUpdate = await Kyc.findOneAndUpdate({userId: req.user}, {$set: {selfie: uploadDocs._id}});
    return {success: true, message: 'Kyc updated successfully'};
};

const findByUserId = async (userId) => {
    const kycData = await Kyc.findOne({userId : userId}).populate('kycDoc').populate('selfie');
    return kycData;
};

module.exports = {
  addIdType,
  uploadKycDoc,
  uploadSelfie,
  findByUserId
};
