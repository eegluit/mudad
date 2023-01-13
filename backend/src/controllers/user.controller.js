const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, storeService, kycService, creditScoreService, profileService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  // const filter = pick(req.query, ['name', 'role']);
  // const options = pick(req.query, ['sortBy', 'limit', 'page']);
  // const result = await userService.queryUsers(filter, options);
  let userInfo = []
  const userData = await userService.getAllUsers(req.body);
  for await(const value of userData) {
    
    const isKyc = await kycService.findByUserId(value.id);
    const isStore = await storeService.findByUserId(value.id);
    let kycStatus = 'Not completed by User';
    if(isKyc) {
      if(isKyc.status) {
        kycStatus = isKyc.status;
      }
    }
    const user = {
      isDeleted: value.isDeleted,
      role: value.role,
      isEmailVerified: value.isEmailVerified,
      name: value.name,
      email: value.email,
      id: value.id,
      isKyc : isKyc ? isKyc.selfie ? true : false : false, 
      kycStatus : kycStatus,
      storeRegistered : isStore ? true : false
    }
    if(req.body.role == 'user') {
      const isProfile = await profileService.getProfileById(value.id);
      user.isProfile = isProfile ? true : false
    }
    userInfo.push(user);
  }
  res.status(httpStatus.OK).send({ user : userInfo });
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.body.userId);
  res.status(httpStatus.OK).send({message: 'User deleted successfully'});
});

const getUserPersonalInfo = catchAsync(async (req, res) => {
  const userData = await userService.getUserById(req.user);
  const isKyc = await kycService.findByUserId(req.user);
  const isStore = await storeService.findByUserId(req.user);
  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
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
  if(userData.mobile) user.mobile = userData.mobile;
  if(userData.profile) {
    user.profile = `https://admin.mudad.space/static/docs/profile/${userData.profile.document}`;
  }
  res.status(httpStatus.OK).send(user);
});

const updateUserPersonalInfo = catchAsync(async (req, res) => {
  const userData = await userService.updateUserById(req.user, req.body);
  res.status(httpStatus.OK).send({message : 'Profile updated successfully'});
});

const getMerchantInfo = catchAsync(async (req, res) => {
  const storeData = await storeService.findByUserId(req.user);
  let store = {...storeData};
  store.logo = `https://admin.mudad.space/static/docs/store/${storeData.logo.document}`
  console.log('store',store);
  const kycData = await kycService.findByUserId(req.user);
  console.log(kycData)
  const kyc = {
    idType : kycData.kycIdType,
    kycDoc : kycData.kycDoc ? `https://admin.mudad.space/static/docs/kyc/${kycData.kycDoc.document}` : null,
    selfie : kycData.selfie ? `https://admin.mudad.space/static/docs/kyc/${kycData.selfie.document}` : null
  }
  res.status(httpStatus.OK).send({store : store, kyc});
});

const userDetails = catchAsync(async (req, res) => {
    const userProfile = await profileService.getProfileById(req.body.userId);
    const creditScoreData = await creditScoreService.getCreditScoreByUserId(req.body.userId);
    res.status(httpStatus.OK).send({userProfile, creditScoreData})
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserPersonalInfo,
  updateUserPersonalInfo,
  getMerchantInfo,
  userDetails
};
