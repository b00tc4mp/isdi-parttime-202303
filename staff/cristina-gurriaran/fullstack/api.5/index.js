require('dotenv').config()

const express = require('express')
const { cors , bodyParser } = require('./utils')
const { helloApiHandler, registerUserHandler, authenticateUserHandler, retrieveUserHandler, updateUserAvatarHandler, updateUserPasswordHandler, retrievePostsHandler, createPostHandler, deletePostHandler, updatePostHandler, retrievePostHandler, retrieveFavPostsHandler, toggleFavPostHandler, toggleLikePostHandler } = require('./handlers')

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

        api.get('/', helloApiHandler)

        api.post('/users', bodyParser, registerUserHandler)

        api.post('/users/auth', bodyParser, authenticateUserHandler)

        api.get('/users', retrieveUserHandler)

        api.patch('/users/avatar', bodyParser, updateUserAvatarHandler)

        api.patch('/users/password', bodyParser, updateUserPasswordHandler)

        api.get('/users/fav', retrieveFavPostsHandler)

        api.get('/posts', retrievePostsHandler)

        api.post('/posts', bodyParser, createPostHandler)

        api.delete('/posts', bodyParser, deletePostHandler)

        api.patch('/posts', bodyParser, updatePostHandler)

        api.get('/posts/:postId', retrievePostHandler)

        api.patch('/posts/:postId/fav', toggleFavPostHandler)

        api.patch('/posts/:postId/like', toggleLikePostHandler)

        api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))
    })
    .catch(console.error)
