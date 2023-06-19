require('dotenv').config()

const express = require('express')

const { cors, jsonBodyParser } = require('./utils')
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
    deletePostHandler
} = require('./handlers')

const api = express()

api.use(cors)

api.get('/', helloApiHandler)

api.post('/users', jsonBodyParser, registerUserHandler)

api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

api.get('/users', retrieveUserHandler)

api.get('/posts', retrievePostsHandler)

api.get('/posts/:postId', retrievePostHandler)

api.patch('/users/avatar', jsonBodyParser, updateUserAvatarHandler)

api.patch('/users/password', jsonBodyParser, updateUserPasswordHandler)

api.patch('/users/email', jsonBodyParser, updateUserEmailHandler)

api.post('/posts', jsonBodyParser, createPostHandler)

api.delete('/posts/:postId', deletePostHandler)

api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))