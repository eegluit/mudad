const express = require('express');
const validate = require('../../middlewares/validate');
// const storeValidation = require('../../validations/store.validation');
const dashboardController = require('../../controllers/dashboard.controller');
const auth = require('../../middlewares/auth');
const upload = require('../../middlewares/upload');

const router = express.Router();

router.post('/get-dashboard', auth.authenticateUser, dashboardController.getDashboard);

module.exports = router;