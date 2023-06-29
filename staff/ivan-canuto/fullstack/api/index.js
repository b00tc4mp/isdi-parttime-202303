require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const {
    updateUserAvatarHandler,
    buyPostHandler,
    createCommentHandler,
    createPostHandler,
    deleteCommentHandler,
    deletePostHandler,
    retrievePostHandler,
    registerUserHandler,
    authenticateUserHandler,
    retrieveUserHandler,
    retrievePostsHandler,
    retrieveSavedPostsHandler,
    retrieveUserPostsHandler,
    toggleLikePostHandler,
    setPostPriceHandler,
    unsetPostPriceHandler,
    toggleSavePostHandler,
    toggleVisibilityPostHandler,
    updatePostHandler,
    updateUserPasswordHandler,
    helloWorldHandler
} = require('./handlers')
const { MongoClient } = require('mongodb')
const context = require('./logic/context')

const client = new MongoClient(process.env.MONGODB_URL)

client.connect()
    .then(connection => {
        const db = connection.db()

        context.users = db.collection('users')
        context.posts = db.collection('posts')

        const api = express()

        const jsonBodyParser = bodyParser.json()

        api.get('/', helloWorldHandler)

        api.use(cors())

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users', retrieveUserHandler)

        api.patch('/users/newAvatar', jsonBodyParser, updateUserAvatarHandler)

        api.patch('/posts/:postId/buy', buyPostHandler)

        api.patch('/users/posts/:postId/comment', jsonBodyParser, createCommentHandler)

        api.post('/users/newPost', jsonBodyParser, createPostHandler)

        api.patch('/posts/:postId/comments/:commentId/delete', deleteCommentHandler)

        api.delete('/posts/:postId/delete', deletePostHandler)

        api.get('/users/posts/:postId/post', retrievePostHandler)

        api.get('/users/posts', retrievePostsHandler)

        api.get('/users/savedPosts', retrieveSavedPostsHandler)

        api.get('/users/userPosts', retrieveUserPostsHandler)

        api.patch('/users/posts/:postId/toggleLike', toggleLikePostHandler)

        api.patch('/posts/:postId/postPrice', jsonBodyParser, setPostPriceHandler)

        api.patch('/posts/:postId/notOnSalePost', unsetPostPriceHandler)

        api.patch('/users/posts/:postId/toggleSave', toggleSavePostHandler)

        api.patch('/posts/:postId/togglePostVisibility', toggleVisibilityPostHandler)

        api.patch('/users/posts/:postId/updatePost', jsonBodyParser, updatePostHandler)

        api.patch('/users/newPassword', jsonBodyParser, updateUserPasswordHandler)

        api.listen(process.env.PORT, () => console.log(`Server running in port ${process.env.PORT}`))
    })
    .catch(console.error)