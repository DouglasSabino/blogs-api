

'use strict';

module.exports = {
  /**
  * @param {import('sequelize').QueryInterface} queryInterface 
  * @param {import('sequelize').DataTypes} Sequelize
  */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BlogPosts', {
      id: { 
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true, 
      },
      title: { 
        type: Sequelize.STRING, 
        allowNull: false, 
      },
      content: { 
        type: Sequelize.STRING, 
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      published: { 
        type: Sequelize.DATE, 
        allowNull: false, 
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()')
      },
      updated: { 
        type: Sequelize.DATE, 
        allowNull: false, 
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()')
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('BlogPosts');
  }
};