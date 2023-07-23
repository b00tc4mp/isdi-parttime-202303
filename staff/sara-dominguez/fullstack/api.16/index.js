require('dotenv').config()
const express = require('express')
//dejo de usar ambos a "manija" para utilizarlos a traves de express
// const { cors, jsonBodyParser } = require('./utils'), eliminamos la carpeta utils
const cors = require('cors')
const bodyParser = require('body-parser')
const { helloApiHandler, registerUserHandler, authenticateUserHandler, retrieveUserHandler, updateUserAvatarHandler, updateUserPasswordHandler, createPostHandler, retrievePostHandler, retrievePostsHandler, updatePostHandler, toggleFavPostHandler, toggleLikePostHandler, deletePostHandler, addCommentToPostHandler, removeCommentFromPostHandler } = require('./handlers')
// const { MongoClient } = require('mongodb')
// const context = require('./logic/context')
const mongoose = require('mongoose')

// const client = new MongoClient(process.env.MONGODB_URL)

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const api = express()
        const jsonBodyParser = bodyParser.json()
        api.use(cors())

        //definimos la api
        api.get('/', helloApiHandler)
        api.get('/users', retrieveUserHandler)
        api.get('/posts/:postId', retrievePostHandler)
        api.get('/posts', retrievePostsHandler)

        api.post('/users', jsonBodyParser, registerUserHandler)
        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)
        api.post('/posts', jsonBodyParser, createPostHandler)
        api.post('/posts/:postId/comments', jsonBodyParser, addCommentToPostHandler)


        api.patch('/users', jsonBodyParser, updateUserAvatarHandler)
        api.patch('/users/password', jsonBodyParser, updateUserPasswordHandler)
        api.patch('/posts/:postId/favs', toggleFavPostHandler)
        api.patch('/posts/:postId/update', jsonBodyParser, updatePostHandler)
        api.patch('/posts/:postId/likes', toggleLikePostHandler)

        api.delete('/posts/:postId/delete', deletePostHandler)
        api.delete('/posts/:postId/comments/:comentId', removeCommentFromPostHandler)

        api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))
    })
    .catch(console.error)

