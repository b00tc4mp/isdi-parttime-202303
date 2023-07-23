require('dotenv').config()

const mongoose = require('mongoose')
const authenticateUser = require('./authenticateUser')


const { User, Post } = require('../data/models')

// mongoose.connect('mongodb://127.0.0.1:27017/data')
mongoose.connect(process.env.MONGODB_URL)

    // .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => authenticateUser('usermongoose@email.com', 'Aa-12345'))
    .then((id) => console.log(id))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
