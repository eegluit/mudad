const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { profileService, creditScoreService, emailService, userService } = require('../services');
const ApiError = require('../utils/ApiError');

const addProfile = catchAsync(async (req, res) => {
    const isProfileExists = await profileService.getProfileById(req.user);
    if (isProfileExists) {
      await profileService.updateProfileById(req);
      res.status(202).send({ message: 'Profile updated successfully' });
    } else {
      await profileService.addProfile(req);
      res.status(httpStatus.CREATED).send({ message: 'Profile added successfully' });
    }
});

const uploadStatement = catchAsync(async (req, res) => {
  // try {
    await creditScoreService.readStatementPdf(req);
    res.status(200).send({ message: 'Credit readed successfully' });
  // } catch (err) {
  //   console.log(err)
  //   res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Something went wrong' });
  // }
});

const getCreditScore = catchAsync(async (req, res) => {
    const creditScoreData = await creditScoreService.getCreditScoreByUserId(req.user);
    if(!creditScoreData) throw new ApiError(httpStatus.NOT_FOUND, "Credit score doesn't found");
    const user = await userService.getUserById(req.user);
    await emailService.sendCreditMail(user.email,creditScoreData.credit_score);
    res.status(200).send({ message: 'Credit score sent on your mail.' });
});

const getProfile = catchAsync(async (req, res) => {
  const profileData = await profileService.getProfileById(req.user);
  if(!profileData) throw new ApiError(httpStatus.NOT_FOUND, "Profile doesn't found");
  res.status(200).send({ result : profileData });
});

module.exports = {
  addProfile,
  uploadStatement,
  getCreditScore,
  getProfile
};
