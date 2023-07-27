require('dotenv').config()
const mongoose = require('mongoose')


const updateEmployeePassword = require('./updateEmployeePassword')
const { Employee } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    .then(() => updateEmployeePassword('64c1a5c87d6c77d86f00405a', '66666', '11111', '11111'))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
