require('dotenv').config()

const express = require('express')

const { cors, jsonBodyParser } = require('./utils')
const {
    helloApiHandlers,
    registerUserHandlers,
    authenticateUserHandlers,
    retrieveUserHandlers,
    updateUserAvatarHandlers,
    updateUserPasswordHandlers,
    createPostHandlers
} = require('./middlewares')

const api = express()

api.use(cors)

api.get('/', helloApiHandlers)

api.post('/users', jsonBodyParser, registerUserHandlers)

api.post('/users/auth', jsonBodyParser, authenticateUserHandlers)

api.get('/users', retrieveUserHandlers)

api.patch('/users', jsonBodyParser, updateUserAvatarHandlers)

api.patch('/users/password', updateUserPasswordHandlers)

api.post('/posts', jsonBodyParser, createPostHandlers)

api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))