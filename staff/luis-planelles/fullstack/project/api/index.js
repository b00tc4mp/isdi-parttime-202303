require('dotenv').config();

const registerUserHandler = require('./handlers/registerUserHandler');

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

    api.listen(process.env.PORT, () =>
      console.log(`server running in port ${process.env.PORT}`)
    );
  })
  .catch(console.error);
