require('dotenv').config()

const mongoose = require('mongoose')
const authenticateUser = require('./authenticateUser')


const { User, Post } = require('../data/models')

    // mongoose.connect('mongodb://127.0.0.1:27017/data')
    // mongoose.connect(process.env.MONGODB_URL)

    //  
    //     .then(() => authenticateUser('usermongoose@email.com', 'Aa-12345'))
    //     .then((id) => console.log(id))
    //     .catch(error => { console.log(error) })
    //     .finally(() => mongoose.disconnect())


    ; (async () => {
        try {
            await mongoose.connect(process.env.MONGODB_URL)

            const user = await authenticateUser('rufus@email.com', 'Aa-12345')

            return user.id
        } catch (error) {
            console.log(error)
        } finally {
            mongoose.disconnect()
        }
    })