const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');

const app = express();

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

app.use(express.json());
app.use(userRoutes);

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
