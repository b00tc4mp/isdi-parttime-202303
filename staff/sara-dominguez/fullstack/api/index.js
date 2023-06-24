require('dotenv').config()
const express = require('express')
const { cors, jsonBodyParser } = require('./utils')
const { helloApiHandler, registerUserHandler, authenticateUserHandler, retrieveUserHandler, updateUserAvatarHandler, updateUserPasswordHandler, createPostHandler, retrievePostHandler, retrievePostsHandler } = require('./handlers')
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
        api.use(cors)

        //definimos la api
        api.get('/', helloApiHandler)
        api.post('/users', jsonBodyParser, registerUserHandler)
        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)
        api.get('/users', retrieveUserHandler)
        api.patch('/users', jsonBodyParser, updateUserAvatarHandler)
        api.patch('users', jsonBodyParser, updateUserPasswordHandler)
        api.post('/posts', jsonBodyParser, createPostHandler)
        api.get('/posts', jsonBodyParser, retrievePostHandler)
        api.get('/posts', retrievePostsHandler)

        api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))
    })
    .catch(console.error)

