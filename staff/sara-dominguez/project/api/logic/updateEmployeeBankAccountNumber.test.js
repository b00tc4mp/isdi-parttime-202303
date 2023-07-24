require('dotenv').config()
const mongoose = require('mongoose')


const updateEmployeeBankAccountNumber = require('./updateEmployeeBankAccountNumber')
const { Employee } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    .then(() => updateEmployeeBankAccountNumber('64b57ebe2727a4da766febca', 'ES12 1234 1234 1234 1234 1234', 'ES11 1234 1234 1234 1234 1234'))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
