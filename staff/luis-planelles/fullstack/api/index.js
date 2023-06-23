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
const express = require('express');
const { cors, jsonBodyParser } = require('./utils');
const { MongoClient } = require('mongodb');
const context = require('./logic/context');

const client = new MongoClient(process.env.MONGODB_URL);

client
  .connect()
  .then((connection) => {
    const db = connection.db();

    context.users = db.collection('users');
    context.posts = db.collection('posts');

    let api = express();

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

    api.listen(process.env.PORT, () =>
      console.log(`server running in port ${process.env.PORT}`)
    );
  })
  .catch(console.error);
