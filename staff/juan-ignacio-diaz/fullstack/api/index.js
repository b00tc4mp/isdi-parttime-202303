require('dotenv').config()

const { createPostHandler,
    deletePostHandler,
    retrievePostHandler,
    registerUserHandler, 
    retrieveOnSalePostsHandler,
    retrievePostsHandler,
    retrieveSavePostsHandler,
    retrieveUsersPostsHandler,
    toggleLikePostHandler,
    toggleLockPostHandler,
    updatePostHandler,
    updateBuyPostHandler,
    updatePriceToPostHandler, 
    authenticateUserHandler,
    retrieveUserHandler,
    updateUserPasswordHandler,
    updateUserAvatarHandler,
    updateUserModeHandler,
    toggleSavePostHandler
    } = require('./handlers')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const api = express()
        
        const jsonBodyParser = bodyParser.json()

        api.use(cors())

        api.get('/', (req, res) => {
            //debugger
            res.send('Hello, World!')
        })

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users', retrieveUserHandler)

        api.patch('/users/updatePassword', jsonBodyParser , updateUserPasswordHandler)

        api.patch('/users/updateAvatar', jsonBodyParser , updateUserAvatarHandler)

        api.patch('/users/updateMode', jsonBodyParser, updateUserModeHandler)

        api.patch('/users/posts/:postId/toggleSavePost', toggleSavePostHandler)

        api.post('/posts', jsonBodyParser, createPostHandler)

        api.delete('/posts/:postId', deletePostHandler)

        api.get('/posts/:postId/retrievePost', retrievePostHandler)

        api.get('/posts/retrieveOnSalePosts', retrieveOnSalePostsHandler)

        api.get('/posts/retrievePosts', retrievePostsHandler)

        api.get('/posts/retrieveSavePosts', retrieveSavePostsHandler)

        api.get('/posts/retrieveUserPosts', retrieveUsersPostsHandler)

        api.patch('/posts/:postId/toggleLike', toggleLikePostHandler)

        api.patch('/posts/:postId/toggleLock', toggleLockPostHandler)

        api.patch('/posts/:postId/updatePost', jsonBodyParser, updatePostHandler)

        api.patch('/posts/:postId/updateBuy', updateBuyPostHandler)

        api.patch('/posts/:postId/updatePriceToPost', jsonBodyParser, updatePriceToPostHandler)

        api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))
    })
    .catch(error => {
        console.error(error)
    })