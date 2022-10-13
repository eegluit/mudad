const { Otp } = require('../models');

/**
 * Generate otp
 */
const generateOtp = async (otp, user) => {
  await Otp.create({ otp, user });
};

const verifyOtp = async (otp, user) => {
  const userOtp = await Otp.findOne({ user, otp, status: 'pending' }).sort({ createdAt: -1 });
  if (userOtp != null) {
    // eslint-disable-next-line no-return-await
    return await Otp.findByIdAndUpdate(userOtp._id, { status: 'verified' }, { new: true });
  }
};

module.exports = {
  generateOtp,
  verifyOtp,
};
