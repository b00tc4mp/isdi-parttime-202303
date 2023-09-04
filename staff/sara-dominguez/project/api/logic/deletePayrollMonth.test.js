require('dotenv').config()

const mongoose = require('mongoose')
const deletePayrollMonth = require('./deletePayrollMonth')


const { Employee, PayrollMonth } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    // .then(() => Promise.all(Employee.deleteMany()))
    .then(() => deletePayrollMonth('64f63762a661aadfb2b1fe21', '64f63d1528b3a7bd6481be34'))
    .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())