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
    getFilteredWorkspots
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


        api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))
    })
    .catch(console.error)
