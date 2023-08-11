require('dotenv').config()


const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { registerUserHandler, retrieveUserHandler, authenticateUserHandler, updateUserImageHandler, updateUserNameHandler, updateUserEmailHandler, updateUserPasswordHandler, addPlaygroundHandler, retrieveCitiesFromDatabaseHandler, retrieveCityFromSearchHandler, retrievePlaygroundsFromCityHandler, editPostHandler, deletePostHandler, retrievePlaygroundsHandler, retrieveLikedPostsHandler, retrieveSavedPostsHandler, retrievePostByPostIdHandler, toggleLikePostHandler, toggleSavePostHandler } = require('./handlers')
const ImageKit = require('imagekit');
const mongoose = require('mongoose')

const imagekit = new ImageKit({
    urlEndpoint: 'https://ik.imagekit.io/mklhds',
    publicKey: 'public_WJDarwJpqyHIF7wJkO1GDUq2H8I',
    privateKey: 'private_AxfHXCqlL62sJN7h6kPDrqxbrus='
});

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const jsonBodyParser = bodyParser.json()
        const api = express()

        api.use(cors())

        api.post('/users', jsonBodyParser, registerUserHandler)
        api.get('/users', retrieveUserHandler)
        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.patch('/users/image', jsonBodyParser, updateUserImageHandler)
        api.patch('/users/username', jsonBodyParser, updateUserNameHandler)
        api.patch('/users/email', jsonBodyParser, updateUserEmailHandler)
        api.patch('/users/password', jsonBodyParser, updateUserPasswordHandler)

        api.get('/playgrounds', retrievePlaygroundsHandler)
        api.get('/cities/:city', retrieveCitiesFromDatabaseHandler)
        api.get('/city/:coordinates', retrieveCityFromSearchHandler)
        api.get('/playgrounds/:city', retrievePlaygroundsFromCityHandler)

        api.post(`/playgrounds`, jsonBodyParser, addPlaygroundHandler)

        // api.patch(`/posts/update/:postId`, jsonBodyParser, editPostHandler)
        api.delete(`/posts/:postId`, deletePostHandler)
        api.get('/posts/liked', retrieveLikedPostsHandler)
        api.get('/posts/saved', retrieveSavedPostsHandler)
        api.get('/posts/:postId', retrievePostByPostIdHandler)
        api.patch('/posts/:postId/likes', toggleLikePostHandler)
        api.patch('/posts/:postId/saves', toggleSavePostHandler)

        api.get('/auth', function (req, res) {
            debugger
            var result = imagekit.getAuthenticationParameters();
            res.send(result);
        });

        api.listen(`${process.env.PORT}`, () => console.log(`server running in port ${process.env.PORT}`))
    })
    // .finally(() => mongoose.disconnect())
    .catch(console.error)