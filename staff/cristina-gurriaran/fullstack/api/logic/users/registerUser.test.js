require('dotenv').config()

const mongoose = require('mongoose')
const { User, Post } = require('../../data/models')
const registerUser = require('./registerUser')

// mongoose.connect(process.env.MONGODB_URL)
//     .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
//     .then(() => registerUser('Pepito Grillo', 'pepito@grillo.com', '123123123'))
//     .catch(error => console.error(error))
//     .finally(() => mongoose.disconnect())


(async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL)

    // await Promise.all([User.deleteMany(), Post.deleteMany()])

        await registerUser('Peter Pan', 'peter@pan.com', '123123123')
    } catch (error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
})()