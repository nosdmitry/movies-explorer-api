const { celebrate, Joi } = require('celebrate');
const express = require('express');
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
    image: Joi.string().required().pattern(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/),
    trailer: Joi.string().required().pattern(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/),
    thumbnail: Joi.string().required().pattern(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), addMovie);

moviesRouter.delete('/:movieId', auth, deleteMovie);

module.exports = moviesRouter;
