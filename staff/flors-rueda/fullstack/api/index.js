require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const { registerUserHandler, authenticateUserHandler, retrieveUserHandler, deleteUserHandler, updateAvatarHandler, updateNameHandler, updateMailHandler, updatePasswordHandler, retrievePostsHandler, retrievePostHandler, updatePostHandler, retrieveUserPostsHandler, retrieveFavoritePostsHandler, uploadPostHandler, deletePostHandler, toggleLikeHandler, toggleFavHandler, togglePublicStatHandler } = require('./handlers');

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const api = express()

        const jsonBodyParser = bodyParser.json()

        api.use(cors())

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
