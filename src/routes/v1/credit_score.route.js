const express = require('express');
const validate = require('../../middlewares/validate');
const creditScoreValidation = require('../../validations/credit_score.validation');
const creditScoreController = require('../../controllers/credit_score.controller');
const auth = require('../../middlewares/auth');
const upload = require('../../middlewares/upload');

const router = express.Router();

router.post(
  '/add-profile',
  auth.authenticateUser,
  validate(creditScoreValidation.addProfile),
  creditScoreController.addProfile
);
router.post('/upload-statement', auth.authenticateUser, upload.uploadStatement, creditScoreController.uploadStatement);
router.get('/get-credit-score', auth.authenticateUser, creditScoreController.getCreditScore);

module.exports = router;
