const joi = require('joi');
const model = require('../database/models');
const { makeToken } = require('../util/makeToken');

const servicesLogin = {
  validationLogin: async (body) => {
    const schema = joi.object({
        email: joi.string().required().email(),
        password: joi.string().required(),
    });
    await schema.validateAsync(body);
  },
  login: async (email) => {
        const user = await model.User.findOne({ where: { email }, raw: true });
        const { password, ...restOfUser } = user;
        const token = await makeToken.coder(restOfUser);
        return token;
  },
};

module.exports = { servicesLogin };