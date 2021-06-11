const validator = require('validator');
const mongoose = require('mongoose');
const { errors } = require('../constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    unique: [true, 'Enter email'],
    trim: true,
    lowcase: true,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: errors.emailIsNotCorrectError,
    },
  },
  password: {
    type: String,
    requred: true,
    select: false,
  },
});

exports.User = mongoose.model('user', userSchema);
