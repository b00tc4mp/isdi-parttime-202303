require('dotenv').config()

const mongoose = require('mongoose')
const retrieveUser = require('./retrieveUser')

const { User } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    .then(() => retrieveUser('64a71f96f2a0dffa7b4caa49'))
    .then((console.log))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())

