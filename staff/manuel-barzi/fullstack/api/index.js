require('dotenv').config()

const express = require('express')
const { cors, jsonBodyParser } = require('./utils')
const { helloApiMid, registerUserMid, authenticateUserMid, retrieveUserMid, updateUserAvatarMid, createPostMid } = require('./middlewares')

const api = express()

api.use(cors)

api.get('/', helloApiMid)

api.post('/users', jsonBodyParser, registerUserMid)

api.post('/users/auth', jsonBodyParser, authenticateUserMid)

api.get('/users', retrieveUserMid)

api.patch('/users', jsonBodyParser, updateUserAvatarMid)

api.post('/posts', jsonBodyParser, createPostMid)

api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))