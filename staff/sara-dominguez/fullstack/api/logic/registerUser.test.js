require('dotenv').config()

const mongoose = require('mongoose')
const registerUser = require('./registerUser')


const { User, Post } = require('../data/models')

// mongoose.connect('mongodb://127.0.0.1:27017/data')
mongoose.connect(process.env.MONGODB_URL)

    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => registerUser('User Mongoose', 'usermongoose@email.com', 'Aa-1234'))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
