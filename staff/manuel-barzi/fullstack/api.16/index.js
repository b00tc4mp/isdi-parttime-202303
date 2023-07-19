require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const {
    helloApiHandler,
    registerUserHandler,
    authenticateUserHandler,
    retrieveUserHandler,
    updateUserAvatarHandler,
    createPostHandler,
    retrievePostsHandler,
    retrievePostHandler,
    addCommentToPostHandler,
    removeCommentFromPostHandler
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

        api.patch('/users', jsonBodyParser, updateUserAvatarHandler)

        api.post('/posts', jsonBodyParser, createPostHandler)

        api.get('/posts', retrievePostsHandler)

        api.get('/posts/:postId', retrievePostHandler)

        api.post('/posts/:postId/comments', jsonBodyParser, addCommentToPostHandler)

        api.delete('/posts/:postId/comments/:commentId', removeCommentFromPostHandler)

        api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))
    })
    .catch(console.error)