require('dotenv').config()
const mongoose = require('mongoose')
const { User, Post } = require('../data/models')
const updatePost = require('./updatePost')

mongoose.connect(process.env.MONGODB_URL)

    .then(() => updatePost('64a9323d49d1ae2debdf4a2b', '64a932be929bc930c0d7c2f6', 'https://picsum.photos/125/2', 'updatePost mongoose'))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())