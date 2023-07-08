const mongoose = require('mongoose')
const registerUser = require('./registerUser')
const { User, Post } = require('./models')

mongoose.connect('mongodb://127.0.0.1:27017/data')
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    .catch(error => console.error(error))


    .then((user, post) => {

    })
    .finally(() => mongoose.disconnect)
