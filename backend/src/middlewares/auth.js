const passport = require('passport');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');
const config = require('../config/config');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;

  if (requiredRights.length) {
    const userRights = roleRights.get(user.role);
    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve();
};

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authentication;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null || !token) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Please send access token' });
    const payload = jwt.verify(token, config.jwt.secret);
    req.user = payload.sub;
    next();
  } catch (err) {
    res.status(httpStatus.UNAUTHORIZED).send({code :httpStatus.UNAUTHORIZED, message: 'Unauthorised access' });
  }
};

module.exports = {
  auth,
  authenticateUser,
};
