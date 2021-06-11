const express = require('express');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const pageError = require('./errorRouter');
const moviesRouter = require('./movies');
const userRoutes = require('./users');

const routes = express.Router();

routes.post('/signup', createUser);

routes.post('/signin', login);

routes.use(auth);

routes.use('/users', userRoutes);

routes.use('/movies', moviesRouter);

routes.use('*', pageError);

module.exports = routes;
