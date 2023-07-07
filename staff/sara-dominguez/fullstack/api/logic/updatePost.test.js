require('dotenv').config()
const mongoose = require('mongoose')
const { User, Post } = require('../data/models')
const updatePost = require('./updatePost')

mongoose.connect(process.env.MONGODB_URL)

    .then(() => updatePost('64a7524844a216ac82135848', '64a752c344a216ac82135852', 'https://picsum.photos/125/2', 'updatePost mongoose'))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())