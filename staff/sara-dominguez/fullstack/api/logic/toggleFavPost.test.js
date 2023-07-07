require('dotenv').config()
const { User, Post } = require('../data/models')
const mongoose = require('mongoose')
const toggleFavPost = require('./toggleFavPost')

mongoose.connect(process.env.MONGODB_URL)

    .then(() => toggleFavPost('64a71f96f2a0dffa7b4caa49', '64a735ffbc06c90dba53749d'))
    .then(console.log)
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
