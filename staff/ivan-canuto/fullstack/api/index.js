require('dotenv').config()

const express = require('express')
const { cors, jsonBodyParser } = require('./utils')
const { updateUserAvatarHandler, buyPostHandler, createCommentHandler, createPostHandler, deleteCommentHandler, deletePostHandler, retrievePostHandler, registerUserHandler, authenticateUserHandler, retrieveUserHandler, retrievePostsHandler, retrieveSavedPostsHandler, retrieveUserPostsHandler, toggleLikePostHandler, setPostPriceHandler, unsetPostPriceHandler, toggleSavePostHandler, toggleVisibilityPostHandler, updatePostHandler, updateUserPasswordHandler, helloWorldHandler } = require('./middlewares')

const api = express()

api.get('/', helloWorldHandler)

api.use(cors)

api.post('/users', jsonBodyParser, registerUserHandler)

api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

api.get('/users', retrieveUserHandler)

api.patch('/users', jsonBodyParser, updateUserAvatarHandler)

api.patch('/posts/:postId/buy', buyPostHandler)

api.patch('/users/posts/:postId/comment', jsonBodyParser, createCommentHandler)

api.post('/users/newPost', jsonBodyParser, createPostHandler)

api.patch('/posts/:postId/comments/:commentId/delete', deleteCommentHandler)

api.delete('/posts/:postId/delete', deletePostHandler)

api.get('/users/posts/:postId/post', retrievePostHandler)

api.get('/users/posts', retrievePostsHandler)

api.get('/users/savedPosts', retrieveSavedPostsHandler)

api.get('/users/userPosts', retrieveUserPostsHandler)

api.patch('/users/posts/:postId/toggleLike', toggleLikePostHandler)

api.patch('/posts/:postId/postPrice', jsonBodyParser, setPostPriceHandler)

api.patch('/posts/:postId/notOnSalePost', unsetPostPriceHandler)

api.patch('/users/posts/:postId/toggleSave', toggleSavePostHandler)

api.patch('/posts/:postId/togglePostVisibility', toggleVisibilityPostHandler)

api.patch('/users/posts/:postId/updatePost', jsonBodyParser, updatePostHandler)

api.patch('/users/newPassword', jsonBodyParser, updateUserPasswordHandler)

api.listen(process.env.PORT, () => console.log(`Server running in port ${process.env.PORT}`))