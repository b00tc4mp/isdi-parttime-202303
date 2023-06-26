require('dotenv').config()

const express = require('express')
const { cors, jsonBodyParser } = require('./utils')
const { helloApiHandler, registerUserHandler, authenticateUserHandler, retrieveUserHandler, updateUserPasswordHandler, createPostHandler, retrievePostHandler, retrievePostsHandler, deletePostHandler, updatePostHandler, toggleLikePostHandler, toggleFavPostHandler } = require('./handlers')

const mongodb = require('mongodb')

const { MongoClient } = mongodb
const context = require('./logic/context')


const client = new MongoClient(process.env.MONGODB_URL)


client
  .connect()
  
  .then((connection) => {
    const db = connection.db()
    context.users = db.collection('users')
    context.posts = db.collection('posts')
  

const api = express()

api.use(cors)

api.get('/', helloApiHandler)

api.post('/users', jsonBodyParser, registerUserHandler)

api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

api.get('/users', retrieveUserHandler)

api.patch('/users/password', jsonBodyParser, updateUserPasswordHandler)

api.post('/posts', jsonBodyParser, createPostHandler)

api.get('/posts/:postId', retrievePostHandler)

api.get('/posts', retrievePostsHandler)

api.delete('/posts/:postId', deletePostHandler)

api.patch('/posts/:postId', jsonBodyParser, updatePostHandler)

api.patch('/posts/:postId/likes', toggleLikePostHandler)

api.patch('/posts/:postId/saves', toggleFavPostHandler)

api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))

})
.catch((error) => {
  console.log(error)
})