const express = require('express');
const validate = require('../../middlewares/validate');
const storeValidation = require('../../validations/store.validation');
const storeController = require('../../controllers/store.controller');
const auth = require('../../middlewares/auth');
const upload = require('../../middlewares/upload');

const router = express.Router();

router.post('/register', auth.authenticateUser, upload.uploadStore, validate(storeValidation.register), storeController.register);

module.exports = router;