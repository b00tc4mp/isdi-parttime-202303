require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


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

const context = require('./logic/context')
const { MongoClient } = require('mongodb')

const client = new MongoClient(process.env.MONGODB_URL)

client.connect()
    .then(connection => {
        const db = connection.db()

        //2. save the db in ur context file ('./logic/context')
        context.users = db.collection('users')
        context.posts = db.collection('posts')

        const api = express()

        const jsonBodyParser = bodyParser.json()

        api.use(cors())

        api.get('/', helloApiHandler)

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users', retrieveUserHandler)

        api.post('/posts', jsonBodyParser, createPostHandler)

        api.get('/posts', retrievePostsHandler)

        api.get('/posts/:postId', retrievePostHandler)

        api.get('/users/posts/likes/', retrieveLikedPostsHandler)

        api.patch('/users/avatar', jsonBodyParser, updateUserAvatarHandler)

        api.patch('/users/password', jsonBodyParser, updateUserPasswordHandler)

        api.patch('/users/email', jsonBodyParser, updateUserEmailHandler)

        api.patch('/posts/:postId/likes', toggleLikePostHandler)

        api.delete('/posts/:postId', deletePostHandler)

        api.patch('/posts/post/:postId', jsonBodyParser, updatePostHandler)

        api.listen(process.env.PORT, () => console.log(`//////////////\nSERVER RUNNING\nIN PORT *${process.env.PORT}*\n//////////////`))



    })

    .catch(error => console.error)