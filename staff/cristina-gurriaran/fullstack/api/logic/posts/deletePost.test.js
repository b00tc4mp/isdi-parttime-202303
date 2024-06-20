require('dotenv').config()

const mongoose = require('mongoose')
const { User, Post } = require('../../data/models')
const deletePost = require('./deletePost')

mongoose.connect(process.env.MONGODB_URL)
    .then((user, post) => deletePost("64ac3076cca3c7f9cdb065b0", "64ac30d021dab8b55837ffcf"))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())

