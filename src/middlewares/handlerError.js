const Joi = require('joi');

const knowErrors = {
  REQUIRED_FIELDS: { code: 400, message: 'Some required fields are missing' },
  INVALID_FIELDS: { code: 400, message: 'Invalid fields' },
  TOKEN_NOT_FOUND: { code: 401, message: 'Token not found' },
  INVALID_TOKEN: { code: 401, message: 'Expired or invalid token' },
  NON_EXISTENT_USER: { code: 404, message: 'User does not exist' },
  MISSING_FIELDS: { code: 400, message: 'Some required fields are missing' },
  CATEGORY_NOT_FOUND: { code: 400, message: '"categoryIds" not found' },
  POST_DOES_NOT_EXIST: { code: 404, message: 'Post does not exist' },
  UNAUTHORIZED_USER: { code: 401, message: 'Unauthorized user' },
};

/** @type {import('express').ErrorRequestHandler} */
const handlerError = (err, _req, res, _next) => {
  const JoiError = Joi.isError(err);
  if (JoiError) return res.status(400).json({ message: err.message });
  
  const error = knowErrors[err];
  if (error) return res.status(error.code).json({ message: error.message });
  return res.status(500).json({ message: 'Internal server error' });
};

module.exports = { handlerError };