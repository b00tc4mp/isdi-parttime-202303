require('dotenv').config()

const mongoose = require('mongoose')
const { User, Post } = require('../data/models')

const authenticateUser = require('./authenticateUser')

console.log(process.env.MONGODB_URL)
//mongoose.connect(process.env.MONGODB_URL)
mongoose.connect('mongodb://127.0.0.1:27017/data-test')

    //.then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => authenticateUser('prueba@uno.com', '123123123'))
    .then(console.log)
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
