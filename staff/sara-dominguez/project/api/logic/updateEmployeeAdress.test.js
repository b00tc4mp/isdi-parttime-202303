require('dotenv').config()
const mongoose = require('mongoose')


const updateEmployeeAdress = require('./updateEmployeeAdress')
const { Employee } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    .then(() => updateEmployeeAdress('64c1a6f1e19591be650a5963', 'Plaza ISDI 70 3-2', '08026', 'Barcelona', 'España'
    ))
    .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
