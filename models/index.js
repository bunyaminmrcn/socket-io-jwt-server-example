'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'prod';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};
const init = require('../sequelize-init');

let sequelize;
let connect = new Sequelize(config.database, config.username, config.password, config);

const secure = () => {
  return new Promise((res, rej) => {

    connect
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
        res(true)
      })
      .catch(err => {
        if (err.name == 'SequelizeConnectionError') {
          init()
          setup()
        }
        rej()
      });
  })
}

const setup = () => {
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);

  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }
  
  sequelize.options.logging = false
  
  fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });
  
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
}

setup()
db.secure = secure;

module.exports = db;
