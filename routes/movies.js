const express = require('express');
const { getMovies } = require('../controllers/movies');
const auth = require('../middlewares/auth');

const moviesRouter = express.Router();

moviesRouter.get('/movies', auth, getMovies);

module.exports = moviesRouter;
