/* eslint-disable no-restricted-syntax */
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { quizService } = require('../services');

const addQuiz = catchAsync(async (req, res) => {
  try {
    const quizQueArr = req.body.quizData;
    let totalAns = 0;
    for (const data of quizQueArr) {
      totalAns += data.ans;
    }
    const quizAverage = Math.round(totalAns / (quizQueArr.length + 1));
    const quizData = {
      user: req.user,
      quizData: req.body.quizData,
      quizAverage,
    };
    await quizService.addQuiz(quizData);
    res.status(httpStatus.CREATED).send({ message: 'Quiz added successfully' });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Something went wrong' });
  }
});

module.exports = {
  addQuiz,
};
