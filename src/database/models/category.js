/**
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
 const createCategory = (sequelize, DataTypes) => {
    const category = sequelize.define('Category', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
    }, 
    { 
      timestamps: false 
    });

    return category;
  };
  
  module.exports = createCategory