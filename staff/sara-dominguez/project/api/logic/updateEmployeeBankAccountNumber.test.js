require('dotenv').config()
const mongoose = require('mongoose')
const updateEmployeeBankAccountNumber = require('./updateEmployeeBankAccountNumber')
const { Employee } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    .then(() => updateEmployeeBankAccountNumber('64c1a5c87d6c77d86f00405a', 'ES12 1234 1234 1234 1234 1234', 'ES11 1234 1234 1234 1234 1236'))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
