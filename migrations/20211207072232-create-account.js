'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(20)
      },
      full_name:  {
        type: Sequelize.STRING(50)
      },
      profile: {
        type: Sequelize.STRING,
        defaultValue: '/assets/images/profile/1.png'
      },
      address: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING(50),
      },
      password: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING(15)
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      userTypeId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Accounts');
  }
};