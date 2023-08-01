require('dotenv').config()

const mongoose = require('mongoose')
const { User } = require('../data/models')
const registerUser = require('./registerUser')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const username = 'JulietaG'
        const name = 'Julieta'
        const email = 'julieta@gil.com'
        const password = 'Manzana12!'
        const description = 'Very good person'
        const tags = 'healthy, cool, relax'
        const location = 'Napols 243'
        const availability = [{ day: 'Monday', range: '12:00-13:00' }, { day: 'Thursday', range: '15:00-19:00' }]

        registerUser(username, name, email, password, description, tags, location, availability)
    })
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())