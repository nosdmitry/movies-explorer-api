import { isEmail } from 'validator';

const mongoose = require('mongoose');

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
    validate: [isEmail, 'invalid email'],
  },
  password: {
    type: String,
    requred: true,
    select: false,
  },
});

exports.User = mongoose.model('user', userSchema);
