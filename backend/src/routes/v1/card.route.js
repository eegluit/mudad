const express = require('express');
const validate = require('../../middlewares/validate');
const cardValidation = require('../../validations/card.validation');
const cardController = require('../../controllers/card.controller');
const auth = require('../../middlewares/auth');
const upload = require('../../middlewares/upload');

const router = express.Router();

router.get('/get-card', auth.authenticateUser, cardController.getCard);
router.post('/add-card', auth.authenticateUser, validate(cardValidation.addCard),cardController.addCard);

module.exports = router;