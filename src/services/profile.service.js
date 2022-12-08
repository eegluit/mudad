const httpStatus = require('http-status');
const { Profile } = require('../models');

const addProfile = async (req) => {
  try {
    req.body.userId = req.user;
    const profileRes = await Profile.create(req.body);
    return profileRes;
  } catch (err) {
    throw new Error(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong');
  }
};

const getProfileById = async (userId) => {
  try {
    const profile = await Profile.findOne({ userId });
    return profile;
  } catch (err) {
    throw new Error(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong');
  }
};

const updateProfileById = async (req) => {
  try {
    const profileUpdateRes = await Profile.findOneAndUpdate({ userId: req.user }, { $set: req.body });
    return profileUpdateRes;
  } catch (err) {
    throw new Error(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong');
  }
};

module.exports = {
  addProfile,
  getProfileById,
  updateProfileById,
};
