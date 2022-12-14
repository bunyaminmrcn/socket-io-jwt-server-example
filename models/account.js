'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }

    toJSON() {
      var values = Object.assign({}, this.get());
      delete values.password;
      return values;
    }
  };
  
  Account.init({
    username: DataTypes.STRING(20),
    full_name: DataTypes.STRING(50),
    profile: DataTypes.STRING,
    email: DataTypes.STRING(50),
    password: DataTypes.STRING,
    address: {
      type: DataTypes.STRING
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    phone: DataTypes.STRING(15),
    userTypeId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Account'
  });
  return Account;
};