require('dotenv').config()

const mongoose = require('mongoose')
const retrieveUser = require('./retrieveUser')

const { User } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    .then(() => retrieveUser('64a9323d49d1ae2debdf4a2b'))
    .then((console.log))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())

