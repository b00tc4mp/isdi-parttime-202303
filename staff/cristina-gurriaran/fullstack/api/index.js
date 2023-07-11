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
    updateUserPasswordHandler, 
    retrievePostsHandler, 
    createPostHandler, 
    deletePostHandler, 
    updatePostHandler, 
    retrievePostHandler, 
    retrieveFavPostsHandler, 
    toggleFavPostHandler, 
    toggleLikePostHandler } = require('./handlers')

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

        api.patch('/users/avatar', jsonBodyParser, updateUserAvatarHandler)

        api.patch('/users/password', jsonBodyParser, updateUserPasswordHandler)

        api.get('/users/fav', retrieveFavPostsHandler)

        api.get('/posts', retrievePostsHandler)

        api.post('/posts', jsonBodyParser, createPostHandler)

        api.delete('/posts/:postId', jsonBodyParser, deletePostHandler)

        api.patch('/posts/:postId', jsonBodyParser, updatePostHandler)

        api.get('/posts/:postId', retrievePostHandler)

        api.patch('/posts/:postId/fav', toggleFavPostHandler)

        api.patch('/posts/:postId/like', toggleLikePostHandler)

        api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))
    })
    .catch(console.error)
