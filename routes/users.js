const express = require('express');
const { getUser, updateUserProfile } = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/me', getUser);

userRoutes.patch('/me', updateUserProfile);

module.exports = userRoutes;
