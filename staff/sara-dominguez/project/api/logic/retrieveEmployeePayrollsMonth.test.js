require('dotenv').config()

const mongoose = require('mongoose')
const retrieveEmployeePayrollsMonth = require('./retrieveEmployeePayrollsMonth')


const { Employee, PayrollMonth } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    // .then(() => Promise.all(Employee.deleteMany()))
    .then(() => retrieveEmployeePayrollsMonth('64bd96e4231e82fdecedf204', 2023))
    .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())

