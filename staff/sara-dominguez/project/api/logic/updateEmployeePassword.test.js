require('dotenv').config()
const mongoose = require('mongoose')
const updateEmployeePassword = require('./updateEmployeePassword')
const { Employee } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    .then(() => updateEmployeePassword('64f638b656010b387c3535d4', 'Be-10002', 'Be-10003', 'Be-10003'))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
