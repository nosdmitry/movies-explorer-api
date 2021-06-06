const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/g.test(v);
      },
      message: (props) => `${props.name} must be a Valid URL`,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/g.test(v);
      },
      message: (props) => `${props.name} must be a Valid URL`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/g.test(v);
      },
      message: (props) => `${props.name} must be a Valid URL`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    uniqe: true,
  },
  movieId: {
    type: String,
    required: true,
    uniqe: true,
  },
  nameRU: {
    type: String,
    reuqreid: true,
  },
  nameEN: {
    type: String,
    reuqreid: true,
  },
});

exports.Movie = mongoose.model('movie', movieSchema);
