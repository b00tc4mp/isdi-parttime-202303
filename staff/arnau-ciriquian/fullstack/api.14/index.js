require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { 
    helloApiHandler, 
    registerUserHandler, 
    authenticateUserHandler, 
    getLoggedUserHandler, 
    updateUserAvatarHandler, 
    updateUserEmailHandler, 
    updateUsernameHandler, 
    updateUserPasswordHandler, 
    updateUserFavoritesHandler, 
    deleteAccountHandler, 
    createNewPostHandler, 
    deletePostHandler, 
    retrivePostsHandler, 
    retrivePostHandler, 
    updatePostHandler, 
    togglePostVisibilityHandler,
    togglePostFavoriteHandler, 
    togglePostLikeHandler 
} = require('./handlers')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const api = express()

        const jsonBodyParser = bodyParser.json()

        api.use(cors())

        api.get('/', helloApiHandler)

        // USERS DATA
        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users', getLoggedUserHandler)

        api.patch('/users/avatar', jsonBodyParser, updateUserAvatarHandler)

        api.patch('/users/email', jsonBodyParser, updateUserEmailHandler)

        api.patch('/users/name', jsonBodyParser, updateUsernameHandler)

        api.patch('/users/password', jsonBodyParser, updateUserPasswordHandler)

        api.patch('/users/favs', updateUserFavoritesHandler)

        api.delete('/users', deleteAccountHandler)

        // POSTS DATA
        api.post('/posts', jsonBodyParser, createNewPostHandler)

        api.delete('/posts/:postId', deletePostHandler)

        api.get('/posts', retrivePostsHandler)

        api.get('/posts/:postId', retrivePostHandler)

        api.patch('/posts/:postId', jsonBodyParser, updatePostHandler)

        api.patch('/posts/:postId/visibility', togglePostVisibilityHandler)

        api.patch('/posts/:postId/favs', togglePostFavoriteHandler)

        api.patch('/posts/:postId/like', togglePostLikeHandler)

        api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))
    })
    .catch(console.error)