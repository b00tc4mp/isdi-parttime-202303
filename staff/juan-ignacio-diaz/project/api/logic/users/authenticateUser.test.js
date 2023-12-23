require('dotenv').config()

const mongoose = require('mongoose')
const { User, Post } = require('../../data/models')

const authenticateUser = require('../authenticateUser')

;(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)

        const userId = await authenticateUser('prueba@uno.com', '123123123')

        console.log(userId)
    } catch (error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
})()