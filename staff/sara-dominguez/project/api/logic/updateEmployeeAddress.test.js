require('dotenv').config()
const mongoose = require('mongoose')
const updateEmployeeAddress = require('./updateEmployeeAddress')
const { Employee } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    .then(() => updateEmployeeAddress('64f638b656010b387c3535d4', 'ISDI avenue 70 3 2', '08026', 'Barcelona (Barcelona)', 'Spain'
    ))
    .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
