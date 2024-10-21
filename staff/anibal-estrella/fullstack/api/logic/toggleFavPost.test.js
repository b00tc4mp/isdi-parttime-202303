const toggleFavPost = require('./toggleFavPost')
require('dotenv').config()
const mongoose = require('mongoose')
const { User, Post } = require('../data/models')

// const userId = '64abe601911a717b18c2772a'
const userId = '64bea09dcc1f984dc0e5b41c'
const postId = '64bea299cc1f984dc0e5b45a'

mongoose.connect(process.env.MONGODB_URL)
    .then(() =>
        toggleFavPost(userId, postId))
    .then(() => console.log('TOGGLE Fav 👍'))
    .catch(console.error)
    .finally(mongoose.disconnect)

