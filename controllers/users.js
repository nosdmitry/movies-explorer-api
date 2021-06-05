const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotCorrectDataError = require('../errors/NotCorrectDataError');
const NotUniqueDataError = require('../errors/NotUniqueDataError');
const NotCorrectPasswordError = require('../errors/NotCorrectPasswordError');
const { User } = require('../models/user');

const SOLT_ROUNDS = 10;
const UNIQUE_EMAIL_ERROR = 11000;
const { JWT_SECRET_PHRASE, NODE_ENV } = process.env;

module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).send(await user);
  } catch (err) {
    console.log(err);
  }
};

module.exports.updateUserProfile = async (req, res, next) => {
  try {
    const user = User.findOneAndUpdate({
      _id: req.user._id,
    }, { ...req.body }, {
      new: true, runValidators: true,
    });
    if (!user) {
      throw new NotCorrectDataError('Inputed data error');
    }
    res.status(200).send(await user);
  } catch (err) {
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      throw new NotCorrectDataError('Email is not correct');
    }
    await bcrypt.hash(password, SOLT_ROUNDS)
      .then((hash) => User.create({ ...req.body, password: hash }))
      .then((createUser) => res.status(200).send(createUser));
  } catch (err) {
    if (err.code === UNIQUE_EMAIL_ERROR) {
      next(new NotUniqueDataError('User with this email already exists'));
    }
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new NotCorrectDataError('Email or passwod was not send');
    }
    if (!validator.isEmail(email)) {
      throw new NotCorrectDataError('Email is not correct');
    }
    await User.findOne({ email }).select('+password')
      .then((user) => {
        if (!user) {
          throw new NotCorrectPasswordError('Email or password is not correct');
        }
        bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              throw new NotCorrectPasswordError('Email or password is not correct');
            }
            const token = jwt.sign(
              { _id: user._id },
              NODE_ENV === 'production' ? JWT_SECRET_PHRASE : 'dev-secret',
              { expiresIn: '7d' },
            );
            res.status(200).send({ token });
          })
          .catch(next);
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
};
