const { celebrate, Joi } = require('celebrate');
const express = require('express');
const { getUser, updateUserProfile } = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/me', getUser);

userRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required(),
  }),
}), updateUserProfile);

module.exports = userRoutes;
