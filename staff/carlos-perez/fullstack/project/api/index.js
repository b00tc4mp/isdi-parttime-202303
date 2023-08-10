require('dotenv').config()

const express = require('express')
const { cors, jsonBodyParser } = require('./utils')
const { helloApiHandler, authenticateAdminHandler, registerAdminHandler, updateAdminEmailHandler, updateAdminPasswordHandler, deleteAdminHandler, 
  createUpdateHandler, modifyUpdateHandler, deleteUpdateHandler, toggleUpdateVisibilityHandler,
createEventHandler, modifyEventHandler} = require('./handlers')

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    const api = express()

    api.use(cors)

    api.get('/', helloApiHandler)

    api.post('/admins/auth', jsonBodyParser, authenticateAdminHandler)

    api.post('/admins', jsonBodyParser, registerAdminHandler)

    api.patch('/admins/email', jsonBodyParser, updateAdminEmailHandler)

    api.patch('/admins/password', jsonBodyParser, updateAdminPasswordHandler)

    api.delete('/admins/delete', jsonBodyParser, deleteAdminHandler)

    api.post('/updates', jsonBodyParser, createUpdateHandler)

    api.patch('/updates/:updateId', jsonBodyParser, modifyUpdateHandler)

    api.delete('/updates/:updateId', deleteUpdateHandler)

    api.patch('/updates/:updateId/visibility', toggleUpdateVisibilityHandler)

    api.post('/events', jsonBodyParser, createEventHandler)

    api.patch('/events/:eventId', jsonBodyParser, modifyEventHandler)

    api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))

  })
  .catch(console.error)