const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET;

const makeToken = {
    coder: (payload) => {
        const token = jwt.sign({ payload }, SECRET, { algorithm: 'HS256', expiresIn: '1d' });
        return token;
    },
    decoder: (token) => {
       const decoded = jwt.verify(token, SECRET);
       return decoded;
    },
};

module.exports = { makeToken };