const toggleLikePost = require('./toggleLikePost')
require('dotenv').config()
const mongoose = require('mongoose')
const { User, Post } = require('../data/models')

// const userId = '64abe601911a717b18c2772a'
const userId = '64abe601911b717b18c2772a'
const postId = '64abfe453ffc40d9d60de511'

mongoose.connect(process.env.MONGODB_URL)
    .then(() =>
        toggleLikePost(userId, postId))
    .then(() => console.log('TOGGLE LIKE 👍'))
    .catch(console.error)
    .finally(mongoose.disconnect)

