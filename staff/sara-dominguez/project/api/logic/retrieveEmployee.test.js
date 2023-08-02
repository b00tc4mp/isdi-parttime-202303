require('dotenv').config()

const mongoose = require('mongoose')
const retrieveEmployee = require('./retrieveEmployee')


const { Employee } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    // .then(() => Promise.all(Employee.deleteMany()))
    .then(() => retrieveEmployee('64c9547104674dc61f90e33b'))
    .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
