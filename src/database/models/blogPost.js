

/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
 const CreateBlogPost = (sequelize, DataTypes) => {
    const blogPost = sequelize.define('BlogPost', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.STRING, allowNull: false },
      userId: { type: DataTypes.INTEGER, references: { model: 'User', key: 'id' } },
      published: { type: DataTypes.DATE },
      updated: { type: DataTypes.DATE },
    }, 
    { 
      timestamps: false 
    });

    blogPost.associate = (models) => {
        blogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };
    return blogPost;
  };
  
  module.exports = CreateBlogPost;