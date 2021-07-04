const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { MONGO_URL, PORT } = require('./config/config');
const { errorsHandler } = require('./middlewares/errorsHandler');
const { validationError } = require('./middlewares/validationError');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errors, messages, limiterConfig } = require('./config/constants');

const limiter = rateLimit(limiterConfig);

const app = express();
app.use(helmet());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Methods', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
}));

app.use(requestLogger);
app.use(limiter);
app.use(express.json());

app.use(routes);
app.use(errorLogger);

app.use(errorsHandler);
app.use(validationError);

async function main() {
  try {
    await mongoose.connect(MONGO_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(messages.dbConnected);

    await app.listen(PORT, () => {
      console.log(messages.appListening, PORT);
    });
  } catch (err) {
    console.log(errors.connectionError, err);
  }
}

main();
