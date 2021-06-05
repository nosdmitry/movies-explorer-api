const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/NotAuthorizedError');

const { JWT_SECRET_PHRASE, NODE_ENV } = process.env;

module.exports = async (req, res, next) => {
  let payload;
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new NotAuthorizedError('Access denied, authorization required');
    }
    const token = authorization.replace('Bearer ', '');
    if (!token) {
      throw new NotAuthorizedError('Access denied, authorization required');
    }
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_PHRASE : 'dev-secret');
  } catch (err) {
    next(err);
  }
  req.user = payload;
  next();
};
