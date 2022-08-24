const { serviceCategory } = require('./servicesCategory');
const model = require('../database/models');

const servicesPost = {
    vefifyCategory: async (categoryIds) => {
      const categoriesId = await serviceCategory.getCategory();
      const ids = categoriesId.map((category) => category.id);
      let contain = false;
      for (let i = 0; i < ids.length; i += 1) {
        if (categoryIds.includes(ids[i])) {
            contain = true;
        }
      }
      return contain; 
    },
    blogPost: async ({ title, content, userId: id, categoryIds }) => {
        const posted = await model.BlogPost.create({ title, content, userId: id });
        const postCategories = categoryIds.map((categorie) =>
        model.PostCategory.create({ postId: posted.id, categoryId: categorie }));
        await Promise.all(postCategories);
        return posted;
    },
    getPost: async () => {
      const posts = await model.BlogPost.findAll(
        {
          include: [
            { model: model.User, as: 'user', attributes: { exclude: ['password'] } },
            { model: model.Category, as: 'categories', through: { attributes: [] } },
          ],
        },
      );
      return posts;
    },
    getPostById: async (id) => {
      const post = await model.BlogPost.findOne({
        where: { id },
        include: [
          { model: model.User, as: 'user', attributes: { exclude: ['password'] } },
          { model: model.Category, as: 'categories', through: { attributes: [] } },
        ],
      });
      return post;
    },
    deletePost: async (id, userId) => {
      const postWoner = await servicesPost.getPostById(id);
      if (!postWoner) return 'POST_DOES_NOT_EXIST';
      if (postWoner.dataValues.userId !== userId) return false;
      const deleted = await model.BlogPost.destroy({ where: { id, userId } });
      return deleted;
    },
    putPost: async (title, content, id, userId) => {
      const postWoner = await servicesPost.getPostById(id);
      if (postWoner.dataValues.userId !== userId) return false;
      const [postUpdated] = await model.BlogPost.update(
        { title, content }, { where: { id, userId } },
      );
      return postUpdated;
    },
};

module.exports = { servicesPost };