require('dotenv').config()
const mongoose = require('mongoose')
const retrieveEmployee = require('./retrieveEmployee')
const { Employee } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    // .then(() => Promise.all(Employee.deleteMany()))
    .then(() => retrieveEmployee('64f63762a661aadfb2b1fe21', '64f638b656010b387c3535d4'))
    .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
