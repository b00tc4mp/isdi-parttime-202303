require('dotenv').config()
const express = require('express')
//dejo de usar ambos a "manija" para utilizarlos a traves de express
// const { cors, jsonBodyParser } = require('./utils'), eliminamos la carpeta utils
const cors = require('cors')
const bodyParser = require('body-parser')
const { helloApiHandler, registerUserHandler, authenticateUserHandler, retrieveUserHandler, updateUserAvatarHandler, updateUserPasswordHandler, createPostHandler, retrievePostHandler, retrievePostsHandler, updatePostHandler, toggleFavPostHandler, toggleLikePostHandler } = require('./handlers')
const { MongoClient } = require('mongodb')
const context = require('./logic/context')

const client = new MongoClient(process.env.MONGODB_URL)

client.connect()
    .then(connection => {
        const db = connection.db()

        // const users = db.collection('users')
        // const posts = db.collection('posts')

        // context.users = users
        // context.posts = posts

        context.users = db.collection('users')
        context.posts = db.collection('posts')

        const api = express()

        //le decimos al servidor que acepte cualquier puerto de cualquier navegador--cabecera
        api.use(cors())

        const jsonBodyParser = bodyParser.json()

        //definimos la api
        api.get('/', helloApiHandler)
        api.get('/users', retrieveUserHandler)
        api.get('/posts/:postId', retrievePostHandler)
        api.get('/posts', retrievePostsHandler)

        api.post('/users', jsonBodyParser, registerUserHandler)
        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)
        api.post('/posts', jsonBodyParser, createPostHandler)

        api.patch('/users', jsonBodyParser, updateUserAvatarHandler)
        api.patch('/users/password', jsonBodyParser, updateUserPasswordHandler)
        api.patch('/posts/:postId/favs', toggleFavPostHandler)
        api.patch('/posts/:postId/update', jsonBodyParser, updatePostHandler)
        api.patch('/posts/:postId/likes', toggleLikePostHandler)




        api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))
    })
    .catch(console.error)

