require('dotenv').config()
const mongoose = require('mongoose')
const { User, Workspot } = require('../../../data/models')
const registerUser = require('../registerUser')


mongoose.connect(process.env.MONGODB_URL)
    .then(() => Promise.all([User.deleteMany(), Workspot.deleteMany()]))
    .then(() => registerUser('Pepito Grillo', 'pepito@grillo.com', '123123123'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())
