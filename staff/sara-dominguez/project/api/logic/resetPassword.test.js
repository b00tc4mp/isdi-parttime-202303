require('dotenv').config()
const mongoose = require('mongoose')
const resetPassword = require('./resetPassword')
const { Employee } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    // .then(() => Employee.deleteMany())
    .then(() => resetPassword('64f63762a661aadfb2b1fe21', '10002'))
    .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
