const express = require('express');
require('dotenv').config();
const { routerLogin } = require('./routers/routerLogin');
const { routerUser } = require('./routers/routerUser');
const { routerCategory } = require('./routers/routerCategory');
const { routerPost } = require('./routers/routerPost');
const { handlerError } = require('./middlewares/handlerError');

const app = express();

app.use(express.json());

app.use('/login', routerLogin);
app.use('/user', routerUser);
app.use('/categories', routerCategory);
app.use('/post', routerPost);
app.use(handlerError);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
