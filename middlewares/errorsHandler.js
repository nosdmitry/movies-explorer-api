const { isCelebrateError } = require('celebrate');

const errorsHandler = (err, req, res, next) => {
  if (!isCelebrateError(err)) {
    return next(err);
  }
  const errorBody = err.details.get('body');
  if (errorBody) {
    return res.status(400).send({ message: errorBody.message });
  }
  next(err);
  return null;
};

module.exports = { errorsHandler };
