const express = require('express');
const { getUser } = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/users/me', getUser);

module.exports = userRoutes;
