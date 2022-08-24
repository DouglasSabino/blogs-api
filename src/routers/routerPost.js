const express = require('express');
const { controllerPost } = require('../controllers/controllerPost');
const { handlerTokenValidation } = require('../middlewares/handlerTokenValidation');

const routerPost = express.Router();

// ROTA POST
routerPost.post('/', handlerTokenValidation, controllerPost.blogPost);

// ROTA PUT
routerPost.put('/:id', handlerTokenValidation, controllerPost.putPost);

// ROTAS GET 
routerPost.get('/', handlerTokenValidation, controllerPost.getPost);
routerPost.get('/:id', handlerTokenValidation, controllerPost.getPostById);

// ROTA DELETE
routerPost.delete('/:id', handlerTokenValidation, controllerPost.deletePost);

module.exports = { routerPost };