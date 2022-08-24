const express = require('express');
const { controllerCategory } = require('../controllers/controllerCategory');
const { handlerTokenValidation } = require('../middlewares/handlerTokenValidation');

const routerCategory = express.Router();

// ROTAS POST'S
routerCategory.post('/', handlerTokenValidation, controllerCategory.postCategory);

// ROTAS GET'S
routerCategory.get('/', handlerTokenValidation, controllerCategory.getCategory);

module.exports = { routerCategory };