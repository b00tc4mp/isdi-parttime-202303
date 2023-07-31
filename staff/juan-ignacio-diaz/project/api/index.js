require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')

//add handlers
const { 
    registerUserHandler, 
    authenticateUserHandler, 
    retrieveUserHandler,
    updateUserPasswordHandler,
    updateUserAvatarHandler,
    updateUserModeHandler,
    addUserContactHandler,
    deleteUserContactHandler,

    createListHandler,
    acceptListByUserHandler,
    addUsersToNotifyAcceptListHandler,
    reviewListsAccectedByUserHandler,
    reviewListsToNotifyAcceptHandler,

    addMessageHandler,
    reviewMessagesHandler,

    addStoreHandler,
    reviewStoresHandler

} = require('./handlers')

//


mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const api = express()
        
        const jsonBodyParser = bodyParser.json()

        api.use(cors())
        
        
        api.get('/', (req, res) => {
            //debugger
            res.send('Hello, World!')
        })

//add routes

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users', retrieveUserHandler)

        api.patch('/users/updatePassword', jsonBodyParser , updateUserPasswordHandler)

        api.patch('/users/updateAvatar', jsonBodyParser , updateUserAvatarHandler)

        api.patch('/users/updateMode', jsonBodyParser, updateUserModeHandler)

        api.post('/users/contact/:contactId/add', jsonBodyParser, addUserContactHandler)

        api.delete('/users/contact/:contactId/delete', jsonBodyParser, deleteUserContactHandler)


        api.post('/lists/create', jsonBodyParser, createListHandler)

        api.patch('/lists/:listId/accept', jsonBodyParser, acceptListByUserHandler)
        
        api.post('/lists/:listId/contact/:contactId/notify', jsonBodyParser, addUsersToNotifyAcceptListHandler)

        api.get('/lists/accept', jsonBodyParser, reviewListsAccectedByUserHandler)
        api.get('/lists/notify', jsonBodyParser, reviewListsToNotifyAcceptHandler)

        api.post('/lists/:listId/message', jsonBodyParser, addMessageHandler)

        api.get('/lists/message', jsonBodyParser, reviewMessagesHandler)

        api.post('/lists/:listId/store', jsonBodyParser, addStoreHandler)

        api.get('/lists/stores', jsonBodyParser, reviewStoresHandler)
//

        api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))
    })
    .catch(error => {
        console.error(error)
    })