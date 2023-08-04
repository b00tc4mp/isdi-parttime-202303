require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const {
    updateUserAvatarHandler,
    createCommentHandler,
    createPostHandler,
    deleteCommentHandler,
    deletePostHandler,
    retrievePostHandler,
    registerUserHandler,
    authenticateUserHandler,
    retrieveUserHandler,
    retrievePostsHandler,
    retrieveSavedPostsHandler,
    retrieveUserPostsHandler,
    toggleLikePostHandler,
    unsetPostPriceHandler,
    toggleSavePostHandler,
    toggleVisibilityPostHandler,
    updatePostHandler,
    updateUserPasswordHandler,
    storeInputInDBHandler,
    createConversationHandler,
    retrieveConversationsHandler,
    askForResponseHandler,
    getConversationTitleHandler,
    generateConversationHandler
} = require('./handlers')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const api = express()

        const jsonBodyParser = bodyParser.json()

        api.use(cors())

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users', retrieveUserHandler)

        api.patch('/users/newAvatar', jsonBodyParser, updateUserAvatarHandler)

        api.patch('/users/posts/:postId/comment', jsonBodyParser, createCommentHandler)

        api.post('/users/newPost', jsonBodyParser, createPostHandler)

        api.patch('/posts/:postId/comments/:commentId/delete', deleteCommentHandler)

        api.delete('/posts/:postId/delete', deletePostHandler)

        api.get('/users/posts/:postId/post', retrievePostHandler)

        api.get('/posts', retrievePostsHandler)

        api.get('/users/savedPosts', retrieveSavedPostsHandler)

        api.get('/users/userPosts', retrieveUserPostsHandler)

        api.patch('/users/posts/:postId/toggleLike', toggleLikePostHandler)

        api.patch('/posts/:postId/notOnSalePost', unsetPostPriceHandler)

        api.patch('/users/posts/:postId/toggleSave', toggleSavePostHandler)

        api.patch('/posts/:postId/togglePostVisibility', toggleVisibilityPostHandler)

        api.patch('/users/posts/:postId/updatePost', jsonBodyParser, updatePostHandler)

        api.patch('/users/newPassword', jsonBodyParser, updateUserPasswordHandler)

        api.patch('/users/conversations/:conversationId/userInput', jsonBodyParser, storeInputInDBHandler)

        api.get('/users/conversations', jsonBodyParser, retrieveConversationsHandler)

        api.post('/users/conversations/:conversationId/askForResponse', jsonBodyParser, askForResponseHandler)

        api.post('/users/generateConversation', jsonBodyParser, generateConversationHandler)

        api.listen(process.env.PORT, () => console.log(`Server running in port ${process.env.PORT}`))
    })
    .catch(console.error)