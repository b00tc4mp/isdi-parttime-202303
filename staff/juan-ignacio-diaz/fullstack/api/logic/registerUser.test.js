require('dotenv').config()

const mongoose = require('mongoose')
const { User, Post } = require('../data/models')

const registerUser = require('./registerUser')

mongoose.connect(process.env.MONGODB_URL)
    //.then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => registerUser('Prueba Uno', 'prueba@uno.com', '123123123'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())