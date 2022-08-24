const express = require('express');
const { controllerLogin } = require('../controllers/controllerLogin');

const routerLogin = express.Router();

routerLogin.post('/', controllerLogin.login);

module.exports = { routerLogin };