const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { profileService, creditScoreService, emailService, userService } = require('../services');

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
  try {
    res.status(200).send({ message: 'Credit readed successfully' });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Something went wrong' });
  }
});

const getCreditScore = catchAsync(async (req, res) => {
  console.log('called', req.user);
    const creditScoreData = await creditScoreService.getCreditScoreByUserId(req.user);
    const user = await userService.getUserById(req.user);
    await emailService.sendCreditMail(user.email,creditScoreData.credit_score);
    res.status(200).send({ message: 'Credit score sent on your mail.' });
});

module.exports = {
  addProfile,
  uploadStatement,
  getCreditScore,
};
