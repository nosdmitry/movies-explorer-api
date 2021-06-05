const validator = require('validator');
const bcrypt = require('bcryptjs');
const NotCorrectDataError = require('../errors/NotCorrectDataError');
const NotUniqueDataError = require('../errors/NotUniqueDataError');
const { User } = require('../models/user');

const SOLT_ROUNDS = 10;
const UNIQUE_EMAIL_ERROR = 11000;

module.exports.getUser = async (req, res) => {
  try {
    const user = await User.find({});
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

// module.exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!validator.isEmail(email)) {
//       throw new NotCorrectDataError('Email is not correct');
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
