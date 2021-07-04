const express = require('express');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const pageError = require('./errorRouter');
const moviesRouter = require('./movies');
const userRoutes = require('./users');
const { signupValidation, signinValidation } = require('../middlewares/validations');

const routes = express.Router();

routes.post('/signup', signupValidation, createUser);

routes.post('/signin', signinValidation, login);

routes.use(auth);

routes.use('/users', userRoutes);

routes.use('/movies', moviesRouter);

routes.use('/*', pageError);

module.exports = routes;
