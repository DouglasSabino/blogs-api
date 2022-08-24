const CreatePostCategory = (sequelize, DataTypes) => {
    const postCategory = sequelize.define('PostCategory', {
      postId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    }, {
      timestamps: false,
      tableName: 'PostCategories',
    });
  
    postCategory.associate = (models) => {
      models.Category.belongsToMany(models.BlogPost, {
        as: 'posts',
        through: postCategory,
        foreignKey: 'categoryId',
        otherKey: 'postId'
      });
      models.BlogPost.belongsToMany(models.Category, {
        as: 'categories',
        through: postCategory,
        foreignKey: 'postId',
        otherKey: 'categoryId',
      });
    }
    return postCategory;
  };
  
  module.exports = CreatePostCategory;