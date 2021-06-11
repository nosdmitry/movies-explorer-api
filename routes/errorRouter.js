const express = require('express');
const { pageError } = require('../controllers/pageError');

const errorRouter = express.Router();

errorRouter.get('*', pageError);

errorRouter.post('*', pageError);

module.exports = errorRouter;
