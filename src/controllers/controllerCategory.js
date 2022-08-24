const { serviceCategory } = require('../services/servicesCategory');

const controllerCategory = {
    postCategory: async (req, res, next) => {
      try {
        const body = await serviceCategory.validationBody(req.body);
        const returned = await serviceCategory.postCategory(body); 
        return res.status(201).json(returned);
      } catch (error) {
        next(error);
      }  
    },
    getCategory: async (req, res, _next) => {
      const categories = await serviceCategory.getCategory();
      return res.status(200).json(categories);
    },
};

module.exports = { controllerCategory };