require('dotenv').config()

const mongoose = require('mongoose')
const createPost = require('./createPost')

mongoose.connect(process.env.MONGODB_URL)
    //.then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => createPost('64a5bd5babaa3bce5d9c6434', 'http://image.com/smile', 'smile'))
    .then(result => console.log('created'))
    .catch(console.error)
    .finally(mongoose.disconnect)