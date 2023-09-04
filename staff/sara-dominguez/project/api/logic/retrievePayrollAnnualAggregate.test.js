require('dotenv').config()
const mongoose = require('mongoose')
const retrievePayrollAnnualAggregate = require('./retrievePayrollAnnualAggregate')
const { Employee, PayrollMonth } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    // .then(() => Promise.all(Employee.deleteMany()))
    .then(() => retrievePayrollAnnualAggregate('64f638b656010b387c3535d4', 2023))
    .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())

