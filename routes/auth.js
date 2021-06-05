const express = require('express');
const { createUser } = require('../controllers/users');

const authRouter = express.Router();

authRouter.post('/signup', createUser);

module.exports = authRouter;
