require('dotenv').config()
const express = require('express')
const { cors, jsonBodyParser } = require('./utils')
const { helloApiMid, registerUserMid, authenticateUserMid, retrieveUserMid, updateUserAvatarMid, createPostMid } = require('./middlewares')

const api = express()

//le decimos al servidor que acepte cualquier puerto de cualquier navegador--cabecera
api.use(cors)

//definimos la api
api.get('/', helloApiMid)


api.post('/users', jsonBodyParser, registerUserMid)


api.post('/users/auth', jsonBodyParser, authenticateUserMid)


api.get('/users', retrieveUserMid)


api.patch('/users', jsonBodyParser, updateUserAvatarMid)


api.post('/posts', jsonBodyParser, createPostMid)


api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))
