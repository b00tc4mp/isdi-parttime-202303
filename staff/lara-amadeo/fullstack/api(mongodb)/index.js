require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { helloApiHandler, registerUserHandler, authenticateUserHandler, retrieveUserHandler, updateAvatarHandler, updateEmailHandler, updatePasswordHandler, createPostHandler, retrievePostsHandler, retrievePostHandler, retrieveSavedPostsHandler, updatePostHandler, deletePostHandler, toggleLikePostHandler, toggleSavePostHandler, togglePostVisibilityHandler, sellpostHandler } = require('./handlers')
const mongodb = require('mongodb')
const context = require('./logic/context')


const { MongoClient } = mongodb

const client = new MongoClient(process.env.MONGODB_URL)

client.connect()
    .then(connection => {
        const db = connection.db()

        const users = db.collection('users')
        const posts = db.collection('posts')

        context.users = users
        context.posts = posts

        const api = express()

        const jsonBodyParser = bodyParser.json()

        api.use(cors())

        api.get('/', helloApiHandler)

        //register user
        api.post('/users', jsonBodyParser, registerUserHandler)

        //authenticate user
        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        //retrieve user
        api.get('/users', retrieveUserHandler)

        //update avatar
        api.patch('/users/avatar', jsonBodyParser, updateAvatarHandler)

        //update email
        api.patch('/users/email', jsonBodyParser, updateEmailHandler)

        //update password
        api.patch('/users/password', jsonBodyParser, updatePasswordHandler)

        //create post
        api.post('/posts/new', jsonBodyParser, createPostHandler)

        //retrievePosts
        api.get('/posts', retrievePostsHandler)

        //retrieve post
        api.get('/posts/post/:postId', retrievePostHandler)

        //retrieve saved posts
        api.get('/posts/saved', retrieveSavedPostsHandler)

        //update post
        api.patch('/posts/update/:postId', jsonBodyParser, updatePostHandler)

        //delete post
        api.delete('/posts/delete/:postId', deletePostHandler)

        //toggle like post
        api.patch('/posts/like/:postId', toggleLikePostHandler)

        //toggle save post
        api.patch('/posts/save/:postId', toggleSavePostHandler)

        //toggle post visibility
        api.patch('/posts/visibility/:postId', togglePostVisibilityHandler)

        api.patch('/posts/price/:postId', jsonBodyParser, sellpostHandler)

        api.listen(4000)
    })
    .catch(error => {
        console.log(error)
    })