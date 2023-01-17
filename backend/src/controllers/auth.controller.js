const newOtp = require('otp-generators');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, otpService, kycService, storeService } = require('../services');
const { tokenTypes } = require('../config/tokens');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const otp = newOtp.generate(4, { alphabets: false, upperCase: false, specialChar: false });
  const userId = user._id;
  const otpRes = await otpService.generateOtp(otp, userId);
  await emailService.sendOtpEmail(req.body.email, otpRes.otp);
  const tokens = await tokenService.generateOtpToken(user);
  res.status(httpStatus.CREATED).send({ tokens, message: 'OTP has been sent on the email' });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  if(req.body.role) {
    if(user.role == req.body.role) {
      if(user.role == 'admin') {
        const token = await tokenService.generateAuthTokens(user);
        res.status(httpStatus.OK).send({ user, token });
      } else {
        const otp = newOtp.generate(4, { alphabets: false, upperCase: false, specialChar: false });
        const userId = user._id;
        const otpRes = await otpService.generateOtp(otp, userId);
        await emailService.sendOtpEmail(req.body.email, otpRes.otp);
        const tokens = await tokenService.generateOtpToken(user);
        res.status(httpStatus.OK).send({ tokens, message: 'OTP has been sent on the email' });
      }
    } else {
      res.status(httpStatus.UNAUTHORIZED).send({ message: 'Invalid email' });    
    }
  } else {
    if(user.role != 'user') {
      res.status(httpStatus.UNAUTHORIZED).send({ message: 'Invalid email' });
    } else {
      const otp = newOtp.generate(4, { alphabets: false, upperCase: false, specialChar: false });
      const userId = user._id;
      const otpRes = await otpService.generateOtp(otp, userId);
      await emailService.sendOtpEmail(req.body.email, otpRes.otp);
      const tokens = await tokenService.generateOtpToken(user);
      res.status(httpStatus.OK).send({ tokens, message: 'OTP has been sent on the email' });  
    }
  }   
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.accessToken);
  res.status(httpStatus.OK).send({message: 'Logout successfully'});
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
  res.status(httpStatus.OK).send({ token: forgotPasswordToken, message: 'Otp has been sent on your email' });
});

const resetPassword = catchAsync(async (req, res) => {
    await authService.resetPassword(req.user, req.body.password);
    res.status(httpStatus.OK).send({ message: 'Password reset successfully' });
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
    const userData = await userService.getUserById(req.user);
    console.log(userData)
    const otp = await otpService.verifyOtp(req.body.otp, userData);
    const token = await tokenService.generateAuthTokens(userData);
    const isKyc = await kycService.findByUserId(req.user);
    const isStore = await storeService.findByUserId(req.user);
    if (!userData.isEmailVerified) {
      const updateData = {
        isEmailVerified: true,
      };
      await userService.updateUserById(userData._id, updateData);
    }
    await otpService.removeOtp(otp._id);
    if (otp.status === 'verified') {
      const user = {
        isDeleted: userData.isDeleted,
        role: userData.role,
        isEmailVerified: userData.isEmailVerified,
        name: userData.name,
        email: userData.email,
        id: userData.id,
        isKyc : isKyc ? isKyc.selfie ? true : false : false, 
        storeRegistered : isStore ? true : false
      }
      res.status(httpStatus.OK).send({user, token});
    }
});

const forgotVerifyOtp = catchAsync(async (req, res) => {
    const user = await userService.getUserById(req.user);
    const otp = await otpService.verifyOtp(req.body.otp, user);
    const token = await tokenService.generateResetPasswordToken(user._id);
    await otpService.removeOtp(otp._id);
    if (otp.status === 'verified') res.status(httpStatus.OK).send({ token, message: 'Otp verified successfully' });
});

const verifyLogin = catchAsync(async (req, res) => {
  await tokenService.verifyToken(req.body.accessToken, tokenTypes.ACCESS);
  res.status(httpStatus.OK).send({message: 'User already logged in'});
});

const resendOtp = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user);
  await otpService.deleteByUserId(user);
  const otp = newOtp.generate(4, { alphabets: false, upperCase: false, specialChar: false });
  const otpRes = await otpService.generateOtp(otp, user._id);
  await emailService.sendOtpEmail(user.email, otpRes.otp);
  res.status(httpStatus.OK).send({ message: 'Otp has been sent on your email' });
});

const changePassword = catchAsync(async (req, res) => {
  await authService.changePassword(req.user, req.body);
  res.status(httpStatus.OK).send({ message: 'Password reset successfully' });
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
  forgotVerifyOtp,
  verifyLogin,
  resendOtp,
  changePassword
};
