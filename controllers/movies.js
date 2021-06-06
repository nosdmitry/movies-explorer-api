const { Movie } = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const NotAuthorizedError = require('../errors/NotAuthorizedError');

module.exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
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
    const movie = await Movie.findOne({ movieId: req.params.movieId });
    if (!movie) {
      throw new NotFoundError('Requested movie was not found');
    }
    if (movie.owner.toString() === req.user._id) {
      movie.deleteOne();
      res.status(200).send({ message: 'Successfylly deleted' });
    } else {
      throw new NotAuthorizedError('Permission denied. Only movies that was added by current user alowed to delete');
    }
  } catch (err) {
    next(err);
  }
};
