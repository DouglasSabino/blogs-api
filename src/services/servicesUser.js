const Joi = require('joi');
const model = require('../database/models');

const servicesUser = {
    validationBody: async (body) => {
       const schema = Joi.object({
        displayName: Joi.string().min(8).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        image: Joi.string().required(),
       });
       await schema.validateAsync(body);
    },
    verifyIfUserExists: async (email) => { 
      const user = await model.User.findOne({ where: { email }, raw: true });
      return user;
    },
    createUser: async (body) => {
      const { password, ...restOfUser } = await model.User.create(body);
      return restOfUser;
    },
    getUser: async () => {
      const users = await model.User.findAll({ attributes: { exclude: ['password'] } });
      return users;
    },
    getUserById: async (id) => {
      const user = await model.User.findOne(
        { 
          where: { id }, attributes: { exclude: ['password'] }, 
        },
      );
      return user;
    },
    removeUser: async (id) => {
      const deletedUser = await model.User.destroy({ where: { id } });
      return deletedUser;
    },
};

module.exports = { servicesUser };