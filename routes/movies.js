const { celebrate, Joi } = require('celebrate');
const express = require('express');
const { default: validator } = require('validator');
const { errors } = require('../constants');
const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');
const auth = require('../middlewares/auth');

const moviesRouter = express.Router();

moviesRouter.get('/', auth, getMovies);

moviesRouter.post('/', auth, celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(errors.imageUrlIsNotValid);
    }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(errors.trailerUrlIsNotValid);
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(errors.tumbUrlIsNotValid);
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), addMovie);

moviesRouter.delete('/:movieId', auth, deleteMovie);

module.exports = moviesRouter;
