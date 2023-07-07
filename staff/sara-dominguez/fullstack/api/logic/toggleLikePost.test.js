require('dotenv').config()
const mongoose = require('mongoose')
const { User, Post } = require('../data/models')
const toggleLikePost = require('./toggleLikePost')

mongoose.connect(process.env.MONGODB_URL)

    .then(() => toggleLikePost('64a71f96f2a0dffa7b4caa49', '64a735ffbc06c90dba53749d'))
    .then(console.log)
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
