const newOtp = require('otp-generators');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {tokenTypes} = require('../config/tokens');
const { tokenService, quizService } = require('../services');

const addQuiz = catchAsync(async (req, res) => {
    try{
        let quizQueArr = req.body.quizData;
        let totalAns = 0;
        for(let data of quizQueArr) {
            totalAns += data.ans;
        }
        let quizAverage = Math.round(totalAns / (quizQueArr.length + 1));
        const quizData = {
            user: req.user,
            quizData : req.body.quizData,
            quizAverage : quizAverage
        }
        const quizRes = await quizService.addQuiz(quizData);
        res.status(httpStatus.CREATED).send({ message: 'Quiz added successfully' });
    }
    catch(err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message: 'Something went wrong'});
    }
});

module.exports = {
  addQuiz,
};
