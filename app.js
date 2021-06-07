const express = require('express');
const mongoose = require('mongoose');
const { errorsHandler } = require('./middlewares/errorsHandler');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_URL, PORT } = require('./config');

const app = express();

app.use(express.json());

app.use(requestLogger);
app.use(routes);
app.use(errorLogger);

app.use(errorsHandler);
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Server error' : message,
  });
  next();
});

async function main() {
  try {
    await mongoose.connect(MONGO_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('DB connected');

    await app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (err) {
    console.log(`Connection failed, ${err}`);
  }
}

main();
