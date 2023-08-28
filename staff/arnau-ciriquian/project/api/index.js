require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { 
    helloApiHandler, 
    registerUserHandler, 
    authenticateUserHandler, 
    getLoggedUserHandler, 
    updateCharacterHandler, 
    updateUserEmailHandler, 
    updateUsernameHandler, 
    updateUserPasswordHandler, 
    deleteAccountHandler,
    createNewMissionHandler,
    retriveMissionsHandler,
    retriveMissionHandler,
    updateMissionHandler,
    deleteMissionHandler,
    createNewCharacterHandler,
    getUserCharacterHandler
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

        api.patch('/users/email', jsonBodyParser, updateUserEmailHandler)

        api.patch('/users/name', jsonBodyParser, updateUsernameHandler)

        api.patch('/users/password', jsonBodyParser, updateUserPasswordHandler)

        api.delete('/users', deleteAccountHandler)

        // CHARACTERS DATA
        api.post('/characters', jsonBodyParser, createNewCharacterHandler)

        api.get('/characters', jsonBodyParser, getUserCharacterHandler)

        api.patch('/characters', jsonBodyParser, updateCharacterHandler)

        // MISSIONS DATA
        api.post('/missions', jsonBodyParser, createNewMissionHandler)

        api.get('/missions', retriveMissionsHandler)

        api.get('/missions/:missionId', retriveMissionHandler)

        api.patch('/missions/:missionId', jsonBodyParser, updateMissionHandler)

        api.delete('/missions/:missionId', deleteMissionHandler)

        // SERVER PORT
        api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))
    })
    .catch(console.error)