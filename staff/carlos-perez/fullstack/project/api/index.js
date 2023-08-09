require('dotenv').config()

const express = require('express')
const { cors, jsonBodyParser } = require('./utils')
const { helloApiHandler, authenticateAdminHandler, registerAdminHandler, updateAdminEmailHandler, updateAdminPasswordHandler, deleteAdminHandler, createUpdateHandler} = require('./handlers')

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

    api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))

  })
  .catch(console.error)