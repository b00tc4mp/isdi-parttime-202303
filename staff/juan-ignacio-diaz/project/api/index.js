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
    retrieveUserContactsHandler,
    searchUserHandler,

    createListHandler,
    acceptGuestListHandler,
    declineGuestListHandler,
    addUserToInvitedListHandler,
    deleteUserToInvitedListHandler,
    reviewListsGuestHandler,
    reviewListsInvitedHandler,
    copyToNewListHandler,
    retrieveUsersListHandler,
    retrieveListHandler,

    addMessageHandler,
    reviewMessagesHandler,

    addStoreHandler,
    reviewStoresHandler,

    reviewProductTypesHandler,
    
    addProductToListHandler,
    deleteProductToListHandler,
    editProductToListHandler,
    markProductAsPurchasedHandler,
    reviewFilteredProductsHandler,
    reviewProductHandler,
    toggleProductToCartHandler,
    toggleLikeProductHandler

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
        api.get('/users/contacts', retrieveUserContactsHandler)
        api.patch('/users/updatePassword', jsonBodyParser , updateUserPasswordHandler)
        api.patch('/users/updateAvatar', jsonBodyParser , updateUserAvatarHandler)
        api.patch('/users/updateMode', jsonBodyParser, updateUserModeHandler)
        api.post('/users/contact/:contactId/add', addUserContactHandler)
        api.delete('/users/contact/:contactId/delete', deleteUserContactHandler)
        api.post('/users/search', jsonBodyParser, searchUserHandler)

        api.post('/lists/create', jsonBodyParser, createListHandler)
        api.patch('/lists/:listId/accept', acceptGuestListHandler)
        api.delete('/lists/:listId/decline', declineGuestListHandler) 
        api.post('/lists/:listId/contact/:contactId/invited', addUserToInvitedListHandler)
        api.delete('/lists/:listId/contact/:contactId/delete', deleteUserToInvitedListHandler)
        api.get('/lists/guest', reviewListsGuestHandler)
        api.get('/lists/invited', reviewListsInvitedHandler)
        api.post('/lists/:listId/copy', jsonBodyParser, copyToNewListHandler)
        api.get('/lists/:listId/users', retrieveUsersListHandler)
        api.get('/lists/:listId', retrieveListHandler)

        api.post('/lists/:listId/message', jsonBodyParser, addMessageHandler)
        api.get('/lists/:listId/messages', reviewMessagesHandler)

        api.post('/lists/:listId/store', jsonBodyParser, addStoreHandler)
        api.get('/lists/:listId/stores', reviewStoresHandler)

        api.post('/lists/:listId/products/add', jsonBodyParser, addProductToListHandler)
        api.delete('/lists/:listId/products/:productId/delete', deleteProductToListHandler)
        api.patch('/lists/:listId/products/:productId/edit', jsonBodyParser, editProductToListHandler)
        api.patch('/lists/:listId/products/:productId/mark', jsonBodyParser, markProductAsPurchasedHandler)
        api.post('/lists/:listId/products/filter', jsonBodyParser, reviewFilteredProductsHandler)
        api.get('/lists/:listId/products/:productId', reviewProductHandler)
        api.get('/lists/:listId/productTypes', reviewProductTypesHandler)
        api.patch('/lists/:listId/products/:productId/cart', toggleProductToCartHandler)
        api.patch('/lists/:listId/products/:productId/like', toggleLikeProductHandler
        )
        
//

        api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))
    })
    .catch(error => {
        console.error(error)
    })