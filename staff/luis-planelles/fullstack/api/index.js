require('dotenv').config();

const {
  helloApiHandler,
  registerUserHandler,
  authenticateUserHandler,
  retrieveUserHandler,
  updateUserAvatarHandler,
  updateUserPasswordHandler,
  createPostHandler,
} = require('./handlers');

const { cors, jsonBodyParser } = require('./utils');

const express = require('express');
const api = express();

api.use(cors);

// api routes
api.get('/', helloApiHandler);

api.post('/users', jsonBodyParser, registerUserHandler);

api.post('/users/auth', jsonBodyParser, authenticateUserHandler);

api.get('/users/', retrieveUserHandler);

api.patch('/users/updateAvatar/', jsonBodyParser, updateUserAvatarHandler);

api.patch('/users/updatePassword/', jsonBodyParser, updateUserPasswordHandler);

api.post('/users/posts', jsonBodyParser, createPostHandler);

api.listen(process.env.PORT, () =>
  console.log(`server running in port ${process.env.PORT}`)
);
