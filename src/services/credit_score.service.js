const httpStatus = require('http-status');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const { CreditScore } = require('../models');
const ApiError = require('../utils/ApiError');

const readStatementPdf = async (req) => {
  try {
    const pdfRead = `./public/docs/statement/${req.file.name}`;
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const readFileSync = fs.readFileSync(pdfRead);
    try {
      const pdfExtract = await pdfParse(readFileSync);
      let creditData = 700;
      if (pdfExtract.text.search('Mr. Ishan Pachauri')) {
        creditData = 710;
      } else if (pdfExtract.text.search('Mr. Ankit Kumar Gupta')) {
        creditData = 780;
      } else if (pdfExtract.text.search('Mr. Ujjwal Sharma')) {
        creditData = 850;
      }
      const creditScoreData = {
        userId: req.user,
        credit_score: creditData,
      };
      // eslint-disable-next-line no-use-before-define
      const isCreditExists = await getCreditScoreByUserId(req.user);
      if (isCreditExists) {
        // eslint-disable-next-line no-use-before-define
        await updateCreditScoreByUserId(req.user, creditScoreData);
        return { message: 'Update' };
      }
      await CreditScore.create(creditScoreData);
      return { message: 'Created' };
    } catch (error) {
      throw new Error(error);
    }
  } catch (err) {
    throw new Error(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong');
  }
};

const getCreditScoreByUserId = async (userId) => {
  const isCreditScore = await CreditScore.findOne({ userId });
  if(!isCreditScore) throw new ApiError(httpStatus.NOT_FOUND, 'Credit score not found');
  return isCreditScore;
};

const updateCreditScoreByUserId = async (userId, creditData) => {
  const creditRes = await CreditScore.findOneAndUpdate({ userId }, { $set: creditData });
  return creditRes;
};

module.exports = {
  readStatementPdf,
  getCreditScoreByUserId,
  updateCreditScoreByUserId,
};
