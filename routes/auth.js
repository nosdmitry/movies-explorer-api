const express = require('express');
const { createUser, login } = require('../controllers/users');

const authRouter = express.Router();

authRouter.post('/signup', createUser);

authRouter.post('/signin', login);

module.exports = authRouter;
