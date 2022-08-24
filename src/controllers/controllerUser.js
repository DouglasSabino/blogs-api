const { servicesUser } = require('../services/servicesUser');
const { makeToken } = require('../util/makeToken');

const controllerUser = {
    postUser: async (req, res, next) => {
      try {
        const { email } = req.body;
        await servicesUser.validationBody(req.body);
        const user = await servicesUser.verifyIfUserExists(email);
        if (!user) {
          const u = await servicesUser.createUser(req.body);
          const t = makeToken.coder(u);
          return res.status(201).json({ token: t }); 
        }
        return res.status(409).json({ message: 'User already registered' });
      } catch (error) {
        next(error);
      }
    },
    getUser: async (_req, res, _next) => {
      const users = await servicesUser.getUser();
      return res.status(200).json(users);
    },
    getUserById: async (req, res, next) => {
        const { id } = req.params;
        const user = await servicesUser.getUserById(Number(id));
        if (!user) return next('NON_EXISTENT_USER');
        return res.status(200).json(user);
    },
    removeUser: async (req, res, _next) => {
      const { id } = req.user;
      await servicesUser.removeUser(Number(id));
      return res.status(204).end();
    },
};

module.exports = { controllerUser };