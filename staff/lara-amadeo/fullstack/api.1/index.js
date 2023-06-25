require('dotenv').config()

const express = require('express')
const { cors, jsonBodyParser } = require('./utils')
const { helloApiHandler, registerUserHandler, authenticateUserHandler, retrieveUserHandler, updateAvatarHandler, updateEmailHandler, updatePasswordHandler, createPostHandler, retrievePostsHandler, retrievePostHandler, retrieveSavedPostsHandler, updatePostHandler, deletePostHandler, toggleLikePostHandler, toggleSavePostHandler, togglePostVisibilityHandler } = require('./handlers')

const api = express()

api.use(cors)

api.get('/', helloApiHandler)

//register user
api.post('/users', jsonBodyParser, registerUserHandler)

//authenticate user
api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

//retrieve user
api.get('/users', retrieveUserHandler)

//update avatar
api.patch('/users/avatar',jsonBodyParser, updateAvatarHandler)


//update email
api.patch('/users/email', jsonBodyParser, updateEmailHandler)

//update password
api.patch('/users/password',jsonBodyParser, updatePasswordHandler)

//create post
api.post('/posts/new', jsonBodyParser ,createPostHandler)


//retrievePosts
api.get('/posts', retrievePostsHandler)

//retrieve post
api.get('/posts/post/:postId', retrievePostHandler)

//retrieve saved posts
api.get('/posts/saved', retrieveSavedPostsHandler)

//update post
api.patch('/posts/update/:postId', jsonBodyParser, updatePostHandler)

//delete post
api.delete('/posts/delete/:postId', deletePostHandler)

//toggle like post
api.patch('/posts/like/:postId', toggleLikePostHandler)

//toggle save post
api.patch('/posts/save/:postId', toggleSavePostHandler)

//toggle post visibility
api.patch('/posts/visibility/:postId', togglePostVisibilityHandler)

api.listen(4000)