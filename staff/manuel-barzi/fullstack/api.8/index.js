require('dotenv').config()

const express = require('express')
const { cors, jsonBodyParser } = require('./utils')
const { helloApiHandler, registerUserHandler, authenticateUserHandler, retrieveUserHandler, updateUserAvatarHandler, createPostHandler } = require('./handlers')

const api = express()

api.use(cors)

api.get('/', helloApiHandler)

api.post('/users', jsonBodyParser, registerUserHandler)

api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

api.get('/users', retrieveUserHandler)

api.patch('/users', jsonBodyParser, updateUserAvatarHandler)

api.post('/posts', jsonBodyParser, createPostHandler)

api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))