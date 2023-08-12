require('dotenv').config();

const { registerUserHandler, authenticateUserHandler } = require('./handlers');

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    let api = express();

    const jsonBodyParser = bodyParser.json();

    api.use(cors());

    // api routes
    api.get('/', (req, res) => res.send('Hello, Space Monkey.v1!'));

    api.post('/users', jsonBodyParser, registerUserHandler);
    api.post('/users/auth', jsonBodyParser, authenticateUserHandler);

    api.listen(process.env.PORT, () =>
      console.log(`server running in port ${process.env.PORT}`)
    );
  })
  .catch(console.error);
