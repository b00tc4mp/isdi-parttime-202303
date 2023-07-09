require('dotenv').config()

const retrievePost = require('./retrievePost')

const mongoose = require('mongoose')
const { User, Post } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => retrievePost('64aac25c9ef4ef79ca75b01a', '64ab14ef4828e480740068e4'))

    .then(post => console.log(post))

    .catch(console.error)
    .finally(mongoose.disconnect)
