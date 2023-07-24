require('dotenv').config()
const mongoose = require('mongoose')


const updateEmployeePassword = require('./updateEmployeePassword')
const { Employee } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    .then(() => updateEmployeePassword('64b57ebe2727a4da766febca', '22222', '33333', '33333'))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
