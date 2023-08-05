require('dotenv').config()

const mongoose = require('mongoose')
const retrieveEmployeePayrollsMonthYear = require('./retrieveEmployeePayrollsMonthYear')


const { Employee, PayrollMonth } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    // .then(() => Promise.all(Employee.deleteMany()))
    .then(() => retrieveEmployeePayrollsMonthYear('64cbd0c6ec1ec2ab81e62683', "2023"))
    .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())

