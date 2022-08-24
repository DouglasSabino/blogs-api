'use strict';

module.exports = {
  /**
   * @param {import('sequelize')} queryInterface 
   * @param {import('sequelize')} Sequelize 
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      displayName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  /**
     * @param {import('sequelize')} queryInterface 
     * @param {import('sequelize')} Sequelize 
    */
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
