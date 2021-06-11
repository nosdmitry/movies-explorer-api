const { celebrate, Joi } = require('celebrate');
const express = require('express');
const { default: validator } = require('validator');
const { errors } = require('../constants');
const { getUser, updateUserProfile } = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/me', getUser);

userRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message(errors.emailIsNotCorrectError);
    }),
  }),
}), updateUserProfile);

module.exports = userRoutes;
