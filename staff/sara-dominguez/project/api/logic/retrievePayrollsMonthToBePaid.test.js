require('dotenv').config()
const mongoose = require('mongoose')
const retrievePayrollsMonthToBePaid = require('./retrievePayrollsMonthToBePaid')
const { Employee, PayrollMonth } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    // .then(() => Promise.all(Employee.deleteMany()))
    .then(() => retrievePayrollsMonthToBePaid('64f638b656010b387c3535d4', 2023, 1))
    .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())

