const newOtp = require('otp-generators');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {tokenTypes} = require('../config/tokens');
const { authService, userService, tokenService, emailService, otpService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const otp = newOtp.generate(4, { alphabets: false, upperCase: false, specialChar: false });
  const userId = user._id;
  let otpRes = await otpService.generateOtp(otp, userId);
  await emailService.sendOtpEmail(req.body.email, otpRes.otp);
  const tokens = await tokenService.generateOtpToken(user);
  res.status(httpStatus.CREATED).send({ tokens, message: 'OTP has been sent on the email' });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const otp = newOtp.generate(4, { alphabets: false, upperCase: false, specialChar: false });
  const userId = user._id;
  const otpRes = await otpService.generateOtp(otp, userId);
  await emailService.sendOtpEmail(req.body.email, otpRes.otp);
  const tokens = await tokenService.generateOtpToken(user);
  res.status(httpStatus.OK).send({ tokens, message: 'OTP has been sent on the email' });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const user = await userService.getUserByEmail(req.body.email);
  const forgotPasswordToken = await tokenService.generateOtpToken(user);
  const otp = newOtp.generate(4, { alphabets: false, upperCase: false, specialChar: false });
  // const userId = user._id;
  const otpRes = await otpService.generateOtp(otp, user._id);
  await emailService.sendForgotOtpEmail(req.body.email, otpRes.otp);
  // await emailService.sendResetPasswordEmail(req.body.email, forgotPasswordToken);
  res.status(httpStatus.OK).send({ token: forgotPasswordToken, message : "Otp has been sent on your email" });
  // res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.send({ message: 'Password reset successfully' });
  // res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyOtp = catchAsync(async (req, res) => {
  const otpTokenDoc = await tokenService.verifyToken(req.query.token, tokenTypes.VERIFY_OTP);
  const user = await userService.getUserById(otpTokenDoc.user);
  const otp = await otpService.verifyOtp(req.body.otp, user);
  const token = await tokenService.generateAuthTokens(user);
  if(!user.isEmailVerified) {
    const updateData = {
      isEmailVerified : true
    }
    await userService.updateUserById(user._id, updateData)
  }
  await otpService.removeOtp(otp._id);
  await otpTokenDoc.remove();
  if (otp.status === 'verified')
  res.status(httpStatus.OK).send({user, token});
});

const forgotVerifyOtp = catchAsync(async (req, res) => {
  const otpTokenDoc = await tokenService.verifyToken(req.query.token, tokenTypes.VERIFY_OTP);
  const user = await userService.getUserById(otpTokenDoc.user);
  const otp = await otpService.verifyOtp(req.body.otp, user);
  const token = await tokenService.generateResetPasswordToken(user._id);
  await otpService.removeOtp(otp._id);
  await otpTokenDoc.remove();
  if (otp.status === 'verified')
  res.status(httpStatus.OK).send({token, message : 'Otp verified successfully'});
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  verifyOtp,
  forgotVerifyOtp
};
