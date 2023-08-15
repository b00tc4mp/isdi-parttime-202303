require('dotenv').config()
const mongoose = require('mongoose')
const retrievePayrollMonth = require('./retrievePayrollMonth')
const { Employee, PayrollMonth } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    // .then(() => Promise.all(Employee.deleteMany()))
    .then(() => retrievePayrollMonth('64c1a5c87d6c77d86f00405a', 2023, "march"))
    .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())

