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
    deletePostHandler,
    updatePostHandler,
    toggleLikePostHandler,
    retrieveLikedPostsHandler
} = require('./handlers')

const api = express()

api.use(cors)
api.get('/', helloApiHandler)

api.post('/users', jsonBodyParser, registerUserHandler)

api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

api.get('/users/user', retrieveUserHandler)

api.get('/posts/:postId', retrievePostHandler)

api.get('/users/posts/likes/', retrieveLikedPostsHandler)

api.patch('/users/avatar', jsonBodyParser, updateUserAvatarHandler)

api.patch('/users/password', jsonBodyParser, updateUserPasswordHandler)

api.patch('/users/email', jsonBodyParser, updateUserEmailHandler)

api.patch('/posts/:postId/likes', toggleLikePostHandler)

api.post('/posts', jsonBodyParser, createPostHandler)

api.delete('/posts/:postId', deletePostHandler)

api.patch('/posts/post/:postId', jsonBodyParser, updatePostHandler)

api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))