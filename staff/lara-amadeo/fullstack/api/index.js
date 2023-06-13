require('dotenv').config()

const express = require('express')
const { extractUserId } = require('./helpers')
const { cors, jsonBodyParser } = require('./utils')
const { helloApiMid, registerUserMid, authenticateUserMid, retrieveUserMid, updateAvatarMid, updateEmailMid, updatePasswordMid, createPostMid, retrievePostsMid, retrievePostMid, retrieveSavedPostsMid, updatePostMid, deletePostMid, toggleLikePostMid, toggleSavePostMid, togglePostVisibilityMid } = require('./middlewares')

const api = express()

api.use(cors)

api.get('/', helloApiMid)

//register user
api.post('/users', jsonBodyParser, registerUserMid)

//authenticate user
api.post('/users/auth', jsonBodyParser, authenticateUserMid)

//retrieve user
api.get('/users', retrieveUserMid)

//update avatar
api.patch('/users/avatar',jsonBodyParser, updateAvatarMid)


//update email
api.patch('/users/email', jsonBodyParser, updateEmailMid)

//update password
api.patch('/users/password',jsonBodyParser, updatePasswordMid)

//create post
api.post('/posts/new', createPostMid)


//retrievePosts
api.get('/posts', retrievePostsMid)

//retrieve post
api.get('/posts/post/:postId', retrievePostMid)

//retrieve saved posts
api.get('/posts/saved', retrieveSavedPostsMid)

//update post
api.patch('/posts/update/:postId', jsonBodyParser, updatePostMid)

//delete post
api.delete('/posts/delete/:postId', deletePostMid)

//toggle like post
api.patch('/posts/like/:postId', toggleLikePostMid)

//toggle save post
api.patch('/posts/save/:postId', toggleSavePostMid)

//toggle post visibility
api.patch('/posts/visibility/:postId', togglePostVisibilityMid)

api.listen(4000)