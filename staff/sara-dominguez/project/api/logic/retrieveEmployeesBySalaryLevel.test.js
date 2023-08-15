require('dotenv').config()
const mongoose = require('mongoose')
const retrieveEmployeesBySalaryLevel = require('./retrieveEmployeesBySalaryLevel')
const { Employee } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    // .then(() => Promise.all(Employee.deleteMany()))
    .then(() => retrieveEmployeesBySalaryLevel(2))
    // .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
