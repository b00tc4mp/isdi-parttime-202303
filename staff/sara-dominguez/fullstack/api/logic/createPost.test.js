require('dotenv').config()
const mongoose = require('mongoose')
const { User, Post } = require('../data/models')
const createPost = require('./createPost')

mongoose.connect(process.env.MONGODB_URL)

    .then(() => createPost('64a7524844a216ac82135848', 'https://picsum.photos/125/200', 'created post -test mongoose'))
    .then(console.log)
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())

