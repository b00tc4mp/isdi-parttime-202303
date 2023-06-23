require('dotenv').config();

const {
  authenticateUserHandler,
  createPostHandler,
  deletePostHandler,
  registerUserHandler,
  retrieveUserHandler,
  retrievePostsHandler,
  retrievePostHandler,
  updateUserAvatarHandler,
  updateUserPasswordHandler,
  updatePostHandler,
  toggleFavouritePostHandler,
  toggleLikePostHandler,
} = require('./handlers');
const { MongoClient } = require('mongodb');
const express = require('express');
const { cors, jsonBodyParser } = require('./utils');
const api = express();
const context = require('./logic/context');

let server;

const client = new MongoClient(process.env.MONGODB_URL);

client
  .connect()
  .then((connection) => {
    context.users = connection.db().collection('users');
    context.posts = connection.db().collection('posts');

    api.use(cors);

    // api routes
    api.get('/', (req, res) => res.send('Hello, API!'));

    api.post('/users', jsonBodyParser, registerUserHandler);
    api.post('/users/auth', jsonBodyParser, authenticateUserHandler);
    api.get('/users/', retrieveUserHandler);
    api.patch('/users/updateAvatar/', jsonBodyParser, updateUserAvatarHandler);
    api.patch(
      '/users/updatePassword/',
      jsonBodyParser,
      updateUserPasswordHandler
    );
    api.post('/users/post', jsonBodyParser, createPostHandler);

    api.patch('/posts/favourite/:postId', toggleFavouritePostHandler);
    api.patch('/posts/like/:postId', toggleLikePostHandler);
    api.patch('/posts/updatePost/:postId', jsonBodyParser, updatePostHandler);
    api.get('/posts', retrievePostsHandler);
    api.get('/posts/:postId', retrievePostHandler);
    api.delete('/posts/deletePost/:postId', deletePostHandler);

    server = api.listen(process.env.PORT, () =>
      console.log(`server running in port ${process.env.PORT}`)
    );
  })
  .catch(console.error);

module.exports = { api, server };
