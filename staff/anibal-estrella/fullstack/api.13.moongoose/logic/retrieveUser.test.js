require('dotenv').config()

const mongoose = require('mongoose')
const retrieveUser = require('./retrieveUser')
const { User, Post } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)
    // .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    .then(() => retrieveUser('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGFhODhiYWQ2YTljMzdmZTZlODNkZTUiLCJpYXQiOjE2ODg4OTc3MzMsImV4cCI6MTY4ODk4NDEzM30.MHCqRTi3tsFIQVtqvHuFrHZTm4IAbI1wst1wbVtryjo'))
    .catch(error => console.error(error))

    .then((user, post) => {

    })
    .finally(() => mongoose.disconnect)


