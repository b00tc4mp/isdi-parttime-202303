const deletePost = require('./deletePost')
require('dotenv').config()
const mongoose = require('mongoose')
const { User, Post } = require('../data/models')

const userId = '64aa892fae321e180c2c6402'
const postId = '64afd14f701775cc795f60c1'

mongoose.connect(process.env.MONGODB_URL)
    .then(() =>
        deletePost(userId, postId))
    .then(() => console.log('POST DELETED ❌'))
    .catch(console.error)
    .finally(mongoose.disconnect)