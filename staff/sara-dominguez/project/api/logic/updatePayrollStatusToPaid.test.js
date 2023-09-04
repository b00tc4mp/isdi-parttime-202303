require('dotenv').config()
const mongoose = require('mongoose')
const updatePayrollStatusToPaid = require('./updatePayrollStatusToPaid')
const { Employee, PayrollMonth } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    // .then(() => Promise.all(Employee.deleteMany()))
    .then(() => updatePayrollStatusToPaid('64f638b656010b387c3535d4', '64f64fc620ff64472237f280'))
    .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())

