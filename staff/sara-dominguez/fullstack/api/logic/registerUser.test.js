require('dotenv').config()

const mongoose = require('mongoose')
const { User, Post } = require('../data/models')
const registerUser = require('./registerUser')

    // mongoose.connect('mongodb://127.0.0.1:27017/data')
    // mongoose.connect(process.env.MONGODB_URL)

    // .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    // .then(() => registerUser('User1 Mongoose', 'user1mongoose@email.com', 'Aa-1234'))
    // .catch(error => { console.log(error) })
    // .finally(() => mongoose.disconnect())

    ;
(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)

        await Promise.all([User.deleteMany(), Post.deleteMany()])

        await registerUser('User1 Mongoose', 'user1mongoose@email.com', 'Aa-12345')
    } catch (error) {
        console.log(error)
    } finally {
        mongoose.disconnect()
    }
})()