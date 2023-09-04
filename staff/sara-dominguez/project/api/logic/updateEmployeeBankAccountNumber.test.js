require('dotenv').config()
const mongoose = require('mongoose')
const updateEmployeeBankAccountNumber = require('./updateEmployeeBankAccountNumber')
const { Employee } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    .then(() => updateEmployeeBankAccountNumber('64f638b656010b387c3535d4', 'ES1212341234123412341238'))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
