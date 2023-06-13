require('dotenv').config();

const {
  helloApiMid,
  registerUserMid,
  authenticateUserMid,
  retrieveUserMid,
  updateUserAvatarMid,
  updateUserPasswordMid,
  createPostMid,
} = require('./middlewares');

const { cors, jsonBodyParser } = require('./utils');

const express = require('express');
const api = express();

api.use(cors);

// api routes
api.get('/', helloApiMid);

api.post('/users', jsonBodyParser, registerUserMid);

api.post('/users/auth', jsonBodyParser, authenticateUserMid);

api.get('/users/', retrieveUserMid);

api.patch('/users/updateAvatar/', jsonBodyParser, updateUserAvatarMid);

api.patch('/users/updatePassword/', jsonBodyParser, updateUserPasswordMid);

api.post('/users/posts', jsonBodyParser, createPostMid);

api.listen(process.env.PORT, () =>
  console.log(`server running in port ${process.env.PORT}`)
);
