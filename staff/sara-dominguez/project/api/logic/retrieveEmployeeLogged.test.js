require('dotenv').config()
const mongoose = require('mongoose')
const retrieveEmployeeLogged = require('./retrieveEmployeeLogged')
const { Employee } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    // .then(() => Promise.all(Employee.deleteMany()))
    .then(() => retrieveEmployeeLogged('64f63762a661aadfb2b1fe21'))
    .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
