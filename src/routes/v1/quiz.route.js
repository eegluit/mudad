const express = require('express');
const validate = require('../../middlewares/validate');
const quizValidation = require('../../validations/quiz.validation');
const quizController = require('../../controllers/quiz.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/add-quiz', auth.authenticateUser, validate(quizValidation.addQuiz), quizController.addQuiz);


module.exports = router;