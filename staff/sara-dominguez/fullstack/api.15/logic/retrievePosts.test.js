require('dotenv').config()
const mongoose = require('mongoose')
const { User, Post } = require('../data/models')
const retrievePosts = require('./retrievePosts')

mongoose.connect(process.env.MONGODB_URL)

    .then(() => retrievePosts('64a9323d49d1ae2debdf4a2b'))
    .then(console.log)
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())