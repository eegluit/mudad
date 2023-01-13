const httpStatus = require('http-status');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const { Card } = require('../models');
const ApiError = require('../utils/ApiError');

const addCardByUserId = async (userId, data) => {
    const isCardExists = await getCardByCardNo(data.cardNumber);
    if(isCardExists) throw new ApiError(httpStatus.BAD_REQUEST, 'Card aleready exists');
    let cardData = {...data};
    cardData.userId = userId;
    let newCard = await Card.create(cardData);
    return newCard;
};

const getCardByUserId = async (userId) => {
    let cardData = await Card.findOne({userId}).lean();
    console.log(cardData);
    if(cardData) return cardData;
    else throw new ApiError(httpStatus.NOT_FOUND, 'Card not found');
};

const getCardByCardNo = async (cardNumber) => {
    let cardData = await Card.findOne({cardNumber}).lean();
    return cardData;
};

module.exports = {
    addCardByUserId,
    getCardByUserId,
    getCardByCardNo
};
