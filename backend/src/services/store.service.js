const httpStatus = require('http-status');
const { Kyc, Document, Store } = require('../models');
const ApiError = require('../utils/ApiError');

const register = async (req) => {
    let docsBody = {
        createdBy : req.user,
        document : req.body.documentName
    }
    const uploadDocs = await Document.create(docsBody);
    const data = {
        userId : req.user,
        logo : uploadDocs._id,
        name : req.body.name,
        address : req.body.address,
        lat : req.body.lat,
        long : req.body.long
    }
    const isStoreRegisetered = await findByUserId(req.user);
    if(isStoreRegisetered) throw new ApiError(httpStatus.BAD_REQUEST, 'Store already registered');
    const store = await Store.create(data);
    return { message: 'Store registered successfully'};
};

const findByUserId = async (userId) => {
    const storeData = await Store.findOne({userId: userId});
    return storeData;
}

module.exports = {
  register,
  findByUserId
};
