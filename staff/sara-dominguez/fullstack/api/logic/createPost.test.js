require('dotenv').config()
const mongoose = require('mongoose')
const { User, Post } = require('../data/models')
const createPost = require('./createPost')

mongoose.connect(process.env.MONGODB_URL)

    .then(() => createPost('64a9323d49d1ae2debdf4a2b', 'https://picsum.photos/125/2', 'created post -test mongoose'))
    .then(console.log)
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())

