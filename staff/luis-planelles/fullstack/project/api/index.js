require('dotenv').config();

const express = require('express');
const cors = require('cors');

let api = express();

api.use(cors());

// api routes
api.get('/', (req, res) => res.send('Hello, Space Monkey.v1!'));

api.listen(process.env.PORT, () =>
  console.log(`server running in port ${process.env.PORT}`)
);
