require('dotenv').config()

const express = require('express')
const { cors, jsonBodyParser } = require('./utils')
const { helloApiHandler, registerUserHandler, authenticateUserHandler, getLoggedUserHandler, updateUserAvatarHandler, updateUserEmailHandler, updateUsernameHandler, updateUserPasswordHandler, updateUserFavoritesHandler, deleteAccountHandler, createNewPostHandler, deletePostHandler, retrivePostsHandler, retrivePostHandler, updatePostHandler, togglePostVisibilityHandler,togglePostFavoriteHandler, togglePostLikeHandler } = require('./handlers')
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

        // USERS DATA
        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users', getLoggedUserHandler)

        api.patch('/users/avatar', jsonBodyParser, updateUserAvatarHandler)

        api.patch('/users/email', jsonBodyParser, updateUserEmailHandler)

        api.patch('/users/name', jsonBodyParser, updateUsernameHandler)

        api.patch('/users/password', jsonBodyParser, updateUserPasswordHandler)

        api.patch('/users/favs', updateUserFavoritesHandler)

        api.delete('/users', deleteAccountHandler)

        // POSTS DATA
        api.post('/posts', jsonBodyParser, createNewPostHandler)

        api.delete('/posts/:postId', deletePostHandler)

        api.get('/posts', retrivePostsHandler)

        api.get('/posts/:postId', retrivePostHandler)

        api.patch('/posts/:postId', jsonBodyParser, updatePostHandler)

        api.patch('/posts/:postId/visibility', togglePostVisibilityHandler)

        api.patch('/posts/:postId/favs', togglePostFavoriteHandler)

        api.patch('/posts/:postId/like', togglePostLikeHandler)

        api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))
    })
    .catch(console.error)