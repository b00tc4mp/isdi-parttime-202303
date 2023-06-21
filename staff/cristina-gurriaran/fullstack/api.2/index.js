require('dotenv').config()

const express = require('express')
const { cors , jsonBodyParser } = require('./utils')
const { helloApiHandler, registerUserHandler, authenticateUserHandler, retrieveUserHandler, updateUserAvatarHandler, updateUserPasswordHandler, retrievePostsHandler, createPostHandler, deletePostHandler, updatePostHandler, retrievePostHandler, retrieveFavPostsHandler, toggleFavPostHandler, toggleLikePostHandler } = require('./handlers')

const api = express()

api.use(cors)

api.get('/', helloApiHandler)

api.post('/users', jsonBodyParser, registerUserHandler)

api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

api.get('/users', retrieveUserHandler)

api.patch('/users/avatar', jsonBodyParser, updateUserAvatarHandler)

api.patch('/users/password', jsonBodyParser, updateUserPasswordHandler)

api.get('/users/fav', retrieveFavPostsHandler)

api.get('/posts', retrievePostsHandler)

api.post('/posts', jsonBodyParser, createPostHandler)

api.delete('/posts', jsonBodyParser, deletePostHandler)

api.patch('/posts', jsonBodyParser, updatePostHandler)

api.get('/posts/:postId', retrievePostHandler)

api.patch('/posts/:postId/fav', toggleFavPostHandler)

api.patch('/posts/:postId/like', toggleLikePostHandler)





api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))