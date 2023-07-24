require('dotenv').config()

const mongoose = require('mongoose')
const createEmployeeMonthPayroll = require('./createEmployeeMonthPayroll')


const { Employee, PayrollMonth } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    // .then(() => Promise.all(Employee.deleteMany()))
    .then(() => createEmployeeMonthPayroll('64bd87ab06ceac185911ade7', 2023, "July"))
    .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())

