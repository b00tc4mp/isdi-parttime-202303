require('dotenv').config()


const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { registerUserHandler, retrieveUserHandler, authenticateUserHandler, updateUserImageHandler, updateUserNameHandler, updateUserEmailHandler, updateUserPasswordHandler, addPlaygroundHandler, retrieveCitiesFromDatabaseHandler, retrieveCityFromSearchHandler, retrievePlaygroundsFromCityHandler, editPostHandler, deletePostHandler, retrievePlaygroundsHandler, retrieveLikedPlaygroundsHandler, retrieveSavedPlaygroundsHandler, retrievePlaygroundByIdHandler, toggleLikePlaygroundHandler, toggleSavePlaygroundHandler } = require('./handlers')
const mongoose = require('mongoose')



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
        // api.delete(`/posts/:postId`, deletePostHandler)
        api.get('/playgrounds/liked', retrieveLikedPlaygroundsHandler)
        // api.get('/playgrounds/saved', retrieveSavedPlaygroundsHandler)
        api.get('/playground/:playgroundId', retrievePlaygroundByIdHandler)
        api.patch('/playgrounds/:postId/likes', toggleLikePlaygroundHandler)
        // api.patch('/playgrounds/:postId/saves', toggleSavePlaygroundHandler)


        api.listen(`${process.env.PORT}`, () => console.log(`server running in port ${process.env.PORT}`))
    })
    // .finally(() => mongoose.disconnect())
    .catch(console.error)