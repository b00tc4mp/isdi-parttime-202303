require('dotenv').config();

const express = require('express');

const { registerUserMid, authenticateUserMid, retrieveUserMid, deleteUserMid, updateAvatarMid, updateNameMid, updateMailMid, updatePasswordMid, retrievePostsMid, retrievePostMid, updatePostMid, retrieveUserPostsMid, retrieveFavoritePostsMid, uploadPostMid, deletePostMid, toggleLikeMid, toggleFavMid, togglePublicStatMid } = require('./middlewares');

const { cors, jsonBodyParser } = require('./utils');

const api = express();

api.use(cors);

api.post('/users', jsonBodyParser, registerUserMid);

api.post('/users/auth', jsonBodyParser, authenticateUserMid);

api.get('/users/:userId', retrieveUserMid);

api.delete('/users', jsonBodyParser, deleteUserMid);

api.patch('/users/avatar', jsonBodyParser, updateAvatarMid);

api.patch('/users/name', jsonBodyParser, updateNameMid);

api.patch('/users/mail', jsonBodyParser, updateMailMid);

api.patch('/users/password', jsonBodyParser, updatePasswordMid);

api.post('/posts', jsonBodyParser, uploadPostMid);

api.get('/posts', retrievePostsMid);

api.get('/posts/favs', retrieveFavoritePostsMid);

api.get('/posts/user/:userId', retrieveUserPostsMid);

api.get('/posts/:postId', retrievePostMid);

api.delete('/posts/:postId', deletePostMid)

api.patch('/posts/:postId', jsonBodyParser, updatePostMid);

api.patch('/posts/:postId/likes', toggleLikeMid);

api.patch('/posts/:postId/favs', toggleFavMid);

api.patch('/posts/:postId/public', togglePublicStatMid);


api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`));
