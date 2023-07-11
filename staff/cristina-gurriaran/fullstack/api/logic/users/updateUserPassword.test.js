require('dotenv').config()

const mongoose = require('mongoose')
const { User, Post } = require('../../data/models')
const updateUserPassword = require('./updateUserPassword')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => User.create({ name: 'pepito.grillo', email: 'pepito@grillo.com', password: '123123123' }))
    .then(user => updateUserPassword(user.id, '123123123', '234234234', '234234234'))
    .then(console.log)
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
