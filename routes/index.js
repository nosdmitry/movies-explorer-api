const express = require('express');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const moviesRouter = require('./movies');
const userRoutes = require('./users');

const routes = express.Router();

routes.post('/signup', createUser);

routes.post('/signin', login);

routes.use(auth);

routes.use('/users', userRoutes);

routes.use('/movies', moviesRouter);

routes.get('*', async (req, res, next) => {
  try {
    throw new NotFoundError('404. Page not found');
  } catch (err) {
    next(err);
  }
});

module.exports = routes;
