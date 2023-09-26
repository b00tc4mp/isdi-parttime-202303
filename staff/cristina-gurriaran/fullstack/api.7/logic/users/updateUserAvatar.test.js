require('dotenv').config()

const mongoose = require('mongoose')
const { User, Post } = require('../../data/models')
const updateUserAvatar = require('./updateUserAvatar')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => User.create({ name: 'pepito.grillo', email: 'pepito@grillo.com', password: '123123123' }))
    .then(user => updateUserAvatar(user.id, 'Pepito-AVATAR'))
    .then(console.log)
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
