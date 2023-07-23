require('dotenv').config()
const mongoose = require('mongoose')
const { User, Post } = require('../data/models')
const createPost = require('./createPost')

mongoose.connect(process.env.MONGODB_URL)

    .then(() => createPost('64b267b560ffe463d8f49a57', 'https://picsum.photos/125/2', 'created post -test mongoose'))
    .then(console.log)
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())

