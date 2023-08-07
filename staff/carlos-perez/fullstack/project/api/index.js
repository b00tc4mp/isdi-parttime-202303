require('dotenv').config()

const express = require('express')
const { cors, jsonBodyParser } = require('./utils')
const { helloApiHandler} = require('./handlers')

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    const api = express()

    api.use(cors)

    api.get('/', helloApiHandler)

    api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))

  })
  .catch(console.error)