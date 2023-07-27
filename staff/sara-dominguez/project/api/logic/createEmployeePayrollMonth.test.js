require('dotenv').config()

const mongoose = require('mongoose')
const createEmployeePayrollMonth = require('./createEmployeePayrollMonth')


const { Employee, PayrollMonth } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    // .then(() => Promise.all(Employee.deleteMany()))
    .then(() => createEmployeePayrollMonth('64c1a5c87d6c77d86f00405a', 2023, "April"))
    .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())

