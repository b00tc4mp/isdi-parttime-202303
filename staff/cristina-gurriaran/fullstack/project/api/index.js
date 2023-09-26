require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { 
    registerUserHandler, 
    authenticateUserHandler, 
    retrieveUserHandler, 
    updateUserAvatarHandler, 
    updateUserPasswordHandler, 
    createWorkspotHandler,
    retrieveWorkspotsHandler,
    getWorkspotsByNameHandler,
    getFilteredWorkspots,
    retrieveWorkspotHandler,
    updateWorkspotHandler,
    deleteWorkspotHandler,
    toggleLikeWorkspotHandler,
    toggleFavWorkspotHandler,
    retrieveFavWorkspotsHandler,
    addReviewToWorkspotHandler
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

        api.patch('/users/avatar', jsonBodyParser, updateUserAvatarHandler)

        api.patch('/users/password', jsonBodyParser, updateUserPasswordHandler)

        api.post('/workspots', jsonBodyParser, createWorkspotHandler)

        api.get('/workspots', retrieveWorkspotsHandler)

        api.post('/workspots/search', jsonBodyParser, getWorkspotsByNameHandler)

        api.post('/workspots/filter', jsonBodyParser, getFilteredWorkspots)

        api.get('/workspots/:workspotId', retrieveWorkspotHandler)

        api.patch('/workspots/:workspotId', jsonBodyParser, updateWorkspotHandler)

        api.delete('/workspots/:workspotId', deleteWorkspotHandler)

        api.patch('/workspots/:workspotId/like', toggleLikeWorkspotHandler)

        api.patch('/workspots/:workspotId/fav', toggleFavWorkspotHandler)

        api.get('/users/fav', retrieveFavWorkspotsHandler)

        api.post('/workspots/:workspotId/reviews', jsonBodyParser, addReviewToWorkspotHandler)


        api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))
    })
    .catch(console.error)
