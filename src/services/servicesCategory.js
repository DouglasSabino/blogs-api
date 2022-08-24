const Joi = require('joi');
const model = require('../database/models');

const serviceCategory = {
    validationBody: async (body) => {
      const schema = Joi.object({
        name: Joi.string().required(),
      });
      const result = await schema.validateAsync(body);
      return result;
    },
    postCategory: async (body) => {
        const category = await model.Category.create(body);
        return category;
    },
    getCategory: async () => {
      const category = await model.Category.findAll();
      return category;
    },
};

module.exports = { serviceCategory };