const { servicesPost } = require('../services/servicesPost');

const controllerPost = {
    blogPost: async (req, res, next) => {
      const { title, content, categoryIds } = req.body;
      const { id } = req.user;
      if (!title || !content || !categoryIds.length) return next('MISSING_FIELDS');
      const exist = await servicesPost.vefifyCategory(categoryIds);
      if (!exist) return next('CATEGORY_NOT_FOUND');
      const posted = await servicesPost.blogPost({ title, content, userId: id, categoryIds });
      return res.status(201).json(posted);
    },
    getPost: async (_req, res, _next) => {
      const posts = await servicesPost.getPost();
      return res.status(200).json(posts);
    },
    getPostById: async (req, res, next) => {
      const { id } = req.params; 
      const post = await servicesPost.getPostById(id);
      if (!post) return next('POST_DOES_NOT_EXIST');
      return res.status(200).json(post);
    },
    deletePost: async (req, res, next) => {
      const { id } = req.params;
      const userId = req.user.id;
      const postWoner = await servicesPost.deletePost(Number(id), Number(userId));
      if (!postWoner) return next('UNAUTHORIZED_USER');
      if (postWoner === 'POST_DOES_NOT_EXIST') return next('POST_DOES_NOT_EXIST');
      return res.status(204).end();
    },
    putPost: async (req, res, next) => {
      const { id } = req.params;
      const userId = req.user.id;
      const { title, content } = req.body;
      if (!title || !content) return next('MISSING_FIELDS');
      const postWoner = await servicesPost.putPost(title, content, id, userId);
      if (!postWoner) return next('UNAUTHORIZED_USER');
      const updated = await servicesPost.getPostById(Number(id));
      return res.status(200).json(updated);
    },
};

module.exports = { controllerPost };