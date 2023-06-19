require('dotenv').config()

const express = require('express')

const { cors, jsonBodyParser } = require('./utils')
const {
    helloApiHandler,
    registerUserHandler,
    authenticateUserHandler,
    updateUserAvatarHandler,
    updateUserPasswordHandler,
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

api.patch('/users', jsonBodyParser, updateUserAvatarHandler)

api.patch('/users/password', updateUserPasswordHandler)

api.post('/posts', jsonBodyParser, createPostHandler)

api.delete('/posts/:postId', deletePostHandler)

api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))