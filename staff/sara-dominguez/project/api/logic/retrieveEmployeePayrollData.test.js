require('dotenv').config()
const mongoose = require('mongoose')
const retrieveEmployeePayrollData = require('./retrieveEmployeePayrollData')
const { Employee } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    // .then(() => Promise.all(Employee.deleteMany()))
    .then(() => retrieveEmployeePayrollData('64f63762a661aadfb2b1fe21'))
    .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
