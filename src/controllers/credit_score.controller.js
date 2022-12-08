const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { profileService, creditScoreService } = require('../services');

const addProfile = catchAsync(async (req, res) => {
  try {
    const isProfileExists = await profileService.getProfileById(req.user);
    if (isProfileExists) {
      await profileService.updateProfileById(req);
      res.status(202).send({ message: 'Profile updated successfully' });
    } else {
      await profileService.addProfile(req);
      res.status(httpStatus.CREATED).send({ message: 'Profile added successfully' });
    }
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Something went wrong' });
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
  try {
    const creditScoreData = await creditScoreService.getCreditScoreByUserId(req.user);
    res.status(200).send({ response: creditScoreData });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Something went wrong' });
  }
});

module.exports = {
  addProfile,
  uploadStatement,
  getCreditScore,
};
