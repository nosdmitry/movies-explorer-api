const express = require('express');
const { getUser, updateUserProfile } = require('../controllers/users');
const auth = require('../middlewares/auth');

const userRoutes = express.Router();

userRoutes.get('/users/me', auth, getUser);

userRoutes.patch('/users/me', auth, updateUserProfile);

module.exports = userRoutes;
