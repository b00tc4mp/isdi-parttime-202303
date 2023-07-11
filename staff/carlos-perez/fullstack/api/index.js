require('dotenv').config()

const express = require('express')
const { cors, jsonBodyParser } = require('./utils')
const { helloApiHandler, registerUserHandler, authenticateUserHandler, retrieveUserHandler, updateUserPasswordHandler, updateUserEmailHandler, createPostHandler, retrievePostHandler, retrievePostsHandler, deletePostHandler, updatePostHandler, toggleLikePostHandler, toggleFavPostHandler } = require('./handlers')

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    const api = express()

    api.use(cors)

    api.get('/', helloApiHandler)

    api.post('/users', jsonBodyParser, registerUserHandler)

    api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

    api.get('/users', retrieveUserHandler)

    api.patch('/users/password', jsonBodyParser, updateUserPasswordHandler)

    api.patch('/users/email', jsonBodyParser, updateUserEmailHandler)

    api.post('/posts', jsonBodyParser, createPostHandler)

    api.get('/posts/:postId', retrievePostHandler)

    api.get('/posts', retrievePostsHandler)

    api.delete('/posts/:postId', deletePostHandler)

    api.patch('/posts/:postId', jsonBodyParser, updatePostHandler)

    api.patch('/posts/:postId/likes', toggleLikePostHandler)

    api.patch('/posts/:postId/favs', toggleFavPostHandler)

    api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))

  })
  .catch(console.error)