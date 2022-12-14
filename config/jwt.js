const expressJwt = require('express-jwt');
const { config: envConfig } = require('dotenv');
envConfig();

const pathToRegexp = require('path-to-regexp');

const jwt = () => {
  return expressJwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }).unless({
    path: [
      // public routes that don't require authentication
      //'/api/connect_check',
      '/api/auth/login',
      //pathToRegexp(),
    ]
  });
};

module.exports = jwt;
