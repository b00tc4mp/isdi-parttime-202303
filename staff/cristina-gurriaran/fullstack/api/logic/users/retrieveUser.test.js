require('dotenv').config()

const mongoose = require('mongoose')
const { User, Post } = require('../../data/models')
const retrieveUser = require('./retrieveUser')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => User.create({ name: 'pepito.grillo', email: 'pepito@grillo.com', password: '123123123' }))
    .then(user => retrieveUser(user.id))
    .then(console.log)
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
