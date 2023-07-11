require('dotenv').config()

const mongoose = require('mongoose')
const { User, Post } = require('../../data/models') 
const createPost = require('./createPost')

mongoose.connect(process.env.MONGODB_URL)
    .then(user => createPost("64ac3076cca3c7f9cdb065b0", 'imageURL', 'BCN', 'First Post', 'blablabla'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())


