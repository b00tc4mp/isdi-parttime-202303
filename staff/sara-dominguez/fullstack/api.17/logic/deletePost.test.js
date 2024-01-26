require('dotenv').config()
const mongoose = require('mongoose')
const { User, Post } = require('../data/models')
const deletePost = require('./deletePost')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => deletePost(`64a9323d49d1ae2debdf4a2b`, '64a94e19728cd725705e3f6a'))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())

