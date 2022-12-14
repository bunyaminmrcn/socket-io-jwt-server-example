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
      '/api/auth/query',
      '/api/auth/ui_login',
      //'/auth/ui_login_bykey',
      '/api/machines/query',
      "/api/auth/password_reset_code",
      "/api/auth/password_reset",
      "/api/auth/verify_code",
      "/api/auth/test",
      "/api/main/category-versions/findAll",
      "/api/machines/findBySerial/43aa4b6f-efe7-4863-8559-4082a119cdea"
      //pathToRegexp(),
    ]
  });
};

module.exports = jwt;
