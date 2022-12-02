const httpStatus = require('http-status');
const { Otp } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Generate otp
 */
const generateOtp = async (otp, user) => {
  return await Otp.create({ otp, user });
};

const verifyOtp = async (otp, user) => {
  const userOtp = await Otp.findOne({ user, otp, status: 'pending' }).sort({ createdAt: -1 });
  if (userOtp != null) {
    // eslint-disable-next-line no-return-await
    return await Otp.findByIdAndUpdate(userOtp._id, { status: 'verified' }, { new: true });
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Otp');
  }
};

const removeOtp = async (otpId) => {
  return await Otp.findOneAndRemove({_id: otpId});
} 

module.exports = {
  generateOtp,
  verifyOtp,
  removeOtp
};
