require('dotenv').config()

const express = require('express')
const { cors, jsonBodyParser } = require('./utils')
const { helloApiHandler, registerUserHandler, authenticateUserHandler, retrieveUserHandler, updateUserAvatarHandler, createPostHandler } = require('./handlers')
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

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users', retrieveUserHandler)

        api.patch('/users', jsonBodyParser, updateUserAvatarHandler)

        api.post('/posts', jsonBodyParser, createPostHandler)

        api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))
    })
    .catch(console.error)