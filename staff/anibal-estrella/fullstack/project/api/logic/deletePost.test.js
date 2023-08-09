const deletePost = require('./deletePost')
require('dotenv').config()
const mongoose = require('mongoose')
const { User, Post } = require('../data/models')

const userId = '64aac25c9ef4ef79ca75b01a'
const postId = '64ac2545d91820fae3964ba8'

mongoose.connect(process.env.MONGODB_URL)
    .then(() =>
        deletePost(userId, postId))
    .then(() => console.log('POST DELETED ❌'))
    .catch(console.error)
    .finally(mongoose.disconnect)