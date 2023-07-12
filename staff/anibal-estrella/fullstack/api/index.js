require('dotenv').config()
debugger
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const {
    helloApiHandler,
    registerUserHandler,
    authenticateUserHandler,
    updateUserAvatarHandler,
    updateUserPasswordHandler,
    updateUserEmailHandler,
    retrieveUserHandler,
    createPostHandler,
    retrievePostHandler,
    retrievePostsHandler,
    deletePostHandler,
    updatePostHandler,
    toggleLikePostHandler,
    retrieveLikedPostsHandler
} = require('./handlers')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {

        const api = express()

        const jsonBodyParser = bodyParser.json()

        api.use(cors())

        api.get('/', helloApiHandler)

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users', retrieveUserHandler)

        api.post('/posts', jsonBodyParser, createPostHandler)

        api.get('/posts', retrievePostsHandler)

        api.get('/posts/:postId', retrievePostHandler)

        api.get('/users/posts/likes/', retrieveLikedPostsHandler)

        api.patch('/users/avatar', jsonBodyParser, updateUserAvatarHandler)

        api.patch('/users/password', jsonBodyParser, updateUserPasswordHandler)

        api.patch('/users/email', jsonBodyParser, updateUserEmailHandler)

        api.patch('/posts/:postId/likes', toggleLikePostHandler)

        api.delete('/posts/post/:postId', deletePostHandler)

        api.patch('/posts/post/:postId', jsonBodyParser, updatePostHandler)

        api.listen(process.env.PORT, () => console.log(`//////////////\nSERVER RUNNING\nIN PORT *${process.env.PORT}*\n//////////////`))



    })

    .catch(error => console.error)