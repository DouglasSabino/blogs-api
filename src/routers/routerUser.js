const express = require('express');
const { controllerUser } = require('../controllers/controllerUser');
const { handlerTokenValidation } = require('../middlewares/handlerTokenValidation');

const routerUser = express.Router();

// ROTA POST
routerUser.post('/', controllerUser.postUser);

// ROTAS GET'S
routerUser.get('/:id', handlerTokenValidation, controllerUser.getUserById);
routerUser.get('/', handlerTokenValidation, controllerUser.getUser);

// ROTA DELETE
routerUser.delete('/me', handlerTokenValidation, controllerUser.removeUser);

module.exports = { routerUser };