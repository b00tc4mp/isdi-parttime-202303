require('dotenv').config()

const mongoose = require('mongoose')
const { User, Post } = require('../../data/models')
const updatePost = require('./updatePost')


mongoose.connect(process.env.MONGODB_URL)
    .then(user => updatePost('64ac3076cca3c7f9cdb065b0', '64ac32a23bf6c336e58e0aad', 'imageURL', 'BCN', 'Post UPDATED', 'text blabla'))
    .then(console.log)
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
