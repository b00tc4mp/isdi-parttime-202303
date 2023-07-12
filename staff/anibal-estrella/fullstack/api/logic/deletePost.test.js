const deletePost = require('./deletePost')
require('dotenv').config()
const mongoose = require('mongoose')
const { User, Post } = require('../data/models')

const userId = '64ae6702260b27bd79285db6'
const postId = '64ae6aa8f44c0578e27c3ab1'

mongoose.connect(process.env.MONGODB_URL)
    .then(() =>
        deletePost(userId, postId))
    .then(() => console.log('POST DELETED ❌'))
    .catch(console.error)
    .finally(mongoose.disconnect)