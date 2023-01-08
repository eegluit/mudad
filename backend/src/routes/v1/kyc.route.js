const express = require('express');
const validate = require('../../middlewares/validate');
const kycValidation = require('../../validations/kyc.validation');
const kycController = require('../../controllers/kyc.controller');
const auth = require('../../middlewares/auth');
const upload = require('../../middlewares/upload');

const router = express.Router();

router.post('/add-id-type', auth.authenticateUser, validate(kycValidation.addIdType), kycController.addIdType);
router.post('/upload-document', auth.authenticateUser, upload.uploadKycDoc, kycController.uploadKycDoc);
router.post('/upload-selfie', auth.authenticateUser, upload.uploadKycDoc, kycController.uploadSelfie);

module.exports = router;