require('dotenv').config()

const retrieveFavPosts = require('./retrieveFavPosts')

const mongoose = require('mongoose')
const { User, Post } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => retrieveFavPosts('64aa892fae321e180c2c6402'))

    //log posts list
    .then(posts => console.log(posts))

    // load console.log, console.error,mongoose.disc funcs as  callbacks
    // .then(console.log)
    .catch(console.error)
    .finally(mongoose.disconnect)
