require('dotenv').config()
const { User, Post } = require('../data/models')
const mongoose = require('mongoose')
const toggleFavPost = require('./toggleFavPost')

mongoose.connect(process.env.MONGODB_URL)

    .then(() => toggleFavPost('64a9323d49d1ae2debdf4a2b', '64a94da1209631180d8f2a92'))
    .then(console.log)
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
