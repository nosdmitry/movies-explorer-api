const jwt = require('jsonwebtoken');
const { errors } = require('../config/constants');
const NotAuthorizedError = require('../errors/NotAuthorizedError');

const { JWT_SECRET_PHRASE, NODE_ENV } = process.env;

module.exports = async (req, res, next) => {
  let payload;
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new NotAuthorizedError(errors.authorizationRequired);
    }
    const token = authorization.replace('Bearer ', '');
    if (!token) {
      throw new NotAuthorizedError(errors.authorizationRequired);
    }
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_PHRASE : 'dev-secret');
  } catch (err) {
    next(err);
  }
  req.user = payload;
  next();
};
