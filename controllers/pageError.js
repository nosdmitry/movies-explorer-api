const { errors } = require('../constants');
const NotFoundError = require('../errors/NotFoundError');

module.exports.pageError = async (req, res, next) => {
  try {
    throw new NotFoundError(errors.pageNotFound);
  } catch (err) {
    next(err);
  }
};
