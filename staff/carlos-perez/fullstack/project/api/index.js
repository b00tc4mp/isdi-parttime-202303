require('dotenv').config()

const express = require('express')
const { cors, jsonBodyParser } = require('./utils')
const { helloApiHandler, authenticateAdminHandler, registerAdminHandler, updateAdminEmailHandler, updateAdminPasswordHandler, deleteAdminHandler, 
  createUpdateHandler, modifyUpdateHandler, deleteUpdateHandler, toggleUpdateVisibilityHandler, seeUpdateHandler,
createEventHandler, modifyEventHandler, deleteEventHandler, toggleEventVisibilityHandler,
createLyricPostHandler, modifyLyricPostHandler, deleteLyricPostHandler, toggleLyricPostVisibilityHandler,
createMessageHandler, readMessageHandler, deleteMessageHandler, toggleMessageReadHandler} = require('./handlers')

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

    api.get('/updates/:updateId', seeUpdateHandler)

    api.post('/events', jsonBodyParser, createEventHandler)

    api.patch('/events/:eventId', jsonBodyParser, modifyEventHandler)

    api.delete('/events/:eventId', deleteEventHandler)

    api.patch('/events/:eventId/visibility', toggleEventVisibilityHandler)

    api.post('/lyricPosts', jsonBodyParser, createLyricPostHandler)

    api.patch('/lyricPosts/:lyricPostId', jsonBodyParser, modifyLyricPostHandler)

    api.delete('/lyricPosts/:lyricPostId', deleteLyricPostHandler)

    api.patch('/lyricPosts/:lyricPostId/visibility', toggleLyricPostVisibilityHandler)

    api.post('/messages', jsonBodyParser, createMessageHandler)

    api.get('/messages/:messageId', readMessageHandler)

    api.delete('/messages/:messageId', deleteMessageHandler)

    api.patch('/messages/:messageId/status', toggleMessageReadHandler)

    api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))

  })
  .catch(console.error)