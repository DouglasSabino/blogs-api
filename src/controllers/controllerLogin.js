const { servicesLogin } = require('../services/servicesLogin');

const controllerLogin = {
    /** @type {import('express').RequestHandler} */
    login: async (req, res, next) => {
      try {
        const { email, password } = req.body; 
        await servicesLogin.validationLogin({ email, password });
        await servicesLogin.login(email)
         .then((data) => res.status(200).json({ token: data }))
         .catch((e) => { console.log(e.message); next('INVALID_FIELDS'); });
      } catch (error) {
        next('REQUIRED_FIELDS');
      } 
    },
};

module.exports = { controllerLogin };