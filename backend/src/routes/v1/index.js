const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const quizRoute = require('./quiz.route');
const config = require('../../config/config');
const creditScoreRoute = require('./credit_score.route');
const kycRoute = require('./kyc.route');
const storeRoute = require('./store.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/quiz',
    route: quizRoute,
  },
  {
    path: '/credit_score',
    route: creditScoreRoute,
  },
  {
    path: '/kyc',
    route: kycRoute
  },
  {
    path: '/store',
    route: storeRoute
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
