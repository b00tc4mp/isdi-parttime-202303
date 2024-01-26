require('dotenv').config()
const mongoose = require('mongoose')
const searchEmployees = require('./searchEmployees')
const { Employee } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    // .then(() => Promise.all(Employee.deleteMany()))
    .then(() => searchEmployees('64f638b656010b387c3535d4', '3'))
    .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
