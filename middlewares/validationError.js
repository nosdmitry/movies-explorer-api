const { errors } = require('../config/constants');

const validationError = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? errors.serverError : message,
  });
  next();
};

module.exports = { validationError };
