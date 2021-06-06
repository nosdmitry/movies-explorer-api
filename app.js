const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const moviesRouter = require('./routes/movies');
const userRoutes = require('./routes/users');
const { errorsHandler } = require('./middlewares/errorsHandler');
const routes = require('./routes');

const app = express();

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

app.use(express.json());
app.use(authRouter);
app.use(userRoutes);
app.use(moviesRouter);
app.use(routes);

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
