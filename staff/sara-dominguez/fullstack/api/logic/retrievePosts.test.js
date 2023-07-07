require('dotenv').config()
const mongoose = require('mongoose')
const { User, Post } = require('..data/models')
const retrievePosts = require('retrievePosts')

mongoose.connect(orocess.env.MONGODB_URL)

    .then(() => retrievePosts('64a71f96f2a0dffa7b4caa49'))
    .then(console.log)
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())