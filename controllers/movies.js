const { Movie } = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const NotAuthorizedError = require('../errors/NotAuthorizedError');
const { errors, messages } = require('../constants');

module.exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    res.status(200).send(movies);
  } catch (err) {
    next(err);
  }
};

module.exports.addMovie = async (req, res, next) => {
  try {
    const movie = await Movie({ ...req.body, owner: req.user._id });
    console.log(movie);
    res.status(200).send(await movie.save());
  } catch (err) {
    next(err);
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findOne({ _id: req.params.movieId });
    if (!movie) {
      throw new NotFoundError(errors.movieNotFound);
    }
    if (movie.owner.toString() === req.user._id) {
      movie.deleteOne();
      res.status(200).send({ message: messages.deleted });
    } else {
      throw new NotAuthorizedError(errors.movieDeletePermissionError);
    }
  } catch (err) {
    next(err);
  }
};
