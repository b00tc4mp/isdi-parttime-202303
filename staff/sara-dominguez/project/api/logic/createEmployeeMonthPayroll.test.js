require('dotenv').config()

const mongoose = require('mongoose')
const createEmployeeMonthPayroll = require('./createEmployeeMonthPayroll')


const { Employee, PayrollMonth } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    // .then(() => Promise.all(Employee.deleteMany()))
    .then(() => createEmployeeMonthPayroll('64beb991504fb29df29bc692', 2023, "february"))
    .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())

