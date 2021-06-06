const express = require('express');
const NotFoundError = require('../errors/NotFoundError');

const routes = express.Router();

routes.get('*', async (req, res, next) => {
  try {
    throw new NotFoundError('404. Page not found');
  } catch (err) {
    next(err);
  }
});

module.exports = routes;
