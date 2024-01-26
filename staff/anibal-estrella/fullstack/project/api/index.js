require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const ImageKit = require("imagekit");

if (
    !process.env.IMAGEKIT_PUBLIC_KEY ||
    !process.env.IMAGEKIT_PRIVATE_KEY ||
    !process.env.IMAGEKIT_URL_ENDPOINT ||
    !process.env.MONGODB_URL ||
    !process.env.PORT
) {
    console.error("Missing required configuration in environment variables.");
    process.exit(1);
}


var imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

console.log("Public Key:", process.env.IMAGEKIT_PUBLIC_KEY);
console.log("Private Key:", process.env.IMAGEKIT_PRIVATE_KEY);
console.log("URL Endpoint:", process.env.IMAGEKIT_URL_ENDPOINT);

const {
    helloApiHandler,
    registerUserHandler,
    authenticateUserEmailHandler,
    authenticateUserHandler,
    uploadMediaHandler,
    retrieveUserHandler
} = require('./handlers')


mongoose.connect(process.env.MONGODB_URL)
    .then(() => {

        const api = express()

        const jsonBodyParser = bodyParser.json()

        api.use(cors())

        api.get('/', helloApiHandler)

        api.post('/users', jsonBodyParser, registerUserHandler)
        debugger

        api.post('/users/auth/email', jsonBodyParser, authenticateUserEmailHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users', retrieveUserHandler)

        api.post('/upload', jsonBodyParser, uploadMediaHandler)

        // api.post('/events', jsonBodyParser, createEventHandler)

        // api.get('/posts', retrievePostsHandler)

        // api.get('/posts/:postId', retrievePostHandler)

        // api.get('/posts/likes/', retrieveLikedPostsHandler)

        // api.get('/posts/favs', retrieveFavPostsHandler)

        // api.patch('/users/avatar', jsonBodyParser, updateUserAvatarHandler)

        // api.patch('/users/password', jsonBodyParser, updateUserPasswordHandler)

        // api.patch('/users/email', jsonBodyParser, updateUserEmailHandler)

        // api.patch('/posts/:postId/likes', toggleLikePostHandler)

        // api.patch('/users/favs/:postId', toggleFavPostHandler)

        // api.delete('/posts/:postId', deletePostHandler)

        // api.patch('/posts/post/:postId', jsonBodyParser, updatePostHandler)

        // api.post('/posts/:postId/comments', jsonBodyParser, addCommentToPostHandler)

        // api.delete('/posts/:postId/comments/:commentId', removeCommentFromPostHandler)

        api.listen(process.env.PORT, () => console.log(`//////////////\nSERVER RUNNING\nIN PORT *${process.env.PORT}*\n//////////////`))



    })

    .catch(error => console.error(error))