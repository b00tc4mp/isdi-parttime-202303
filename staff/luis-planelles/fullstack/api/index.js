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
    api.get('/', (req, res) => res.send('Hello, API!'));

    api.post('/users', jsonBodyParser, registerUserHandler);
    api.post('/users/auth', jsonBodyParser, authenticateUserHandler);
    api.get('/users', retrieveUserHandler);
    api.patch('/users/updateAvatar', jsonBodyParser, updateUserAvatarHandler);
    api.patch(
      '/users/updatePassword',
      jsonBodyParser,
      updateUserPasswordHandler
    );
    api.post('/users/posts', jsonBodyParser, createPostHandler);

    api.patch('/posts/favourite/:postId', toggleFavouritePostHandler);
    api.patch('/posts/like/:postId', toggleLikePostHandler);
    api.patch('/posts/update/:postId', jsonBodyParser, updatePostHandler);
    api.get('/posts', retrievePostsHandler);
    api.get('/posts/:postId', retrievePostHandler);
    api.delete('/posts/delete/:postId', deletePostHandler);

    api.listen(process.env.PORT, () =>
      console.log(`server running in port ${process.env.PORT}`)
    );
  })
  .catch(console.error);
