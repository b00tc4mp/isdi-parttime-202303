require('dotenv').config();

const express = require('express');

const { cors, jsonBodyParser } = require('./utils');

const { registerUserHandler, authenticateUserHandler, retrieveUserHandler, deleteUserHandler, updateAvatarHandler, updateNameHandler, updateMailHandler, updatePasswordHandler, retrievePostsHandler, retrievePostHandler, updatePostHandler, retrieveUserPostsHandler, retrieveFavoritePostsHandler, uploadPostHandler, deletePostHandler, toggleLikeHandler, toggleFavHandler, togglePublicStatHandler } = require('./handlers');

const { MongoClient } = require('mongodb')
const context = require('./logic/context')

const client = new MongoClient(process.env.MONGODB_URL)

client.connect()
    .then(connection => {
        const db = connection.db()

        context.users = db.collection('users')
        context.posts = db.collection('posts')

        const api = express()

        api.use(cors)

        api.post('/users', jsonBodyParser, registerUserHandler);

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler);

        api.get('/users/:userId', retrieveUserHandler);

        api.delete('/users', jsonBodyParser, deleteUserHandler);

        api.patch('/users/avatar', jsonBodyParser, updateAvatarHandler);

        api.patch('/users/name', jsonBodyParser, updateNameHandler);

        api.patch('/users/mail', jsonBodyParser, updateMailHandler);

        api.patch('/users/password', jsonBodyParser, updatePasswordHandler);

        api.post('/posts', jsonBodyParser, uploadPostHandler);

        api.get('/posts', retrievePostsHandler);

        api.get('/posts/favs', retrieveFavoritePostsHandler);

        api.get('/posts/user/:userId', retrieveUserPostsHandler);

        api.get('/posts/:postId', retrievePostHandler);

        api.delete('/posts/:postId', deletePostHandler)

        api.patch('/posts/:postId', jsonBodyParser, updatePostHandler);

        api.patch('/posts/:postId/likes', toggleLikeHandler);

        api.patch('/posts/:postId/favs', toggleFavHandler);

        api.patch('/posts/:postId/public', togglePublicStatHandler);


        api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`));

    })
    .catch((error) => {
        console.log(error)
    })
