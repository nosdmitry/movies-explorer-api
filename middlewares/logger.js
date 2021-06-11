const winston = require('winston');
const expressWinston = require('express-winston');
const { logs } = require('../config/constants');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: logs.requestLogsPath }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: logs.errorLogsPath }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
