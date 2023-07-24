require('dotenv').config()

const mongoose = require('mongoose')
const authenticateEmployee = require('./authenticateEmployee')


const { Employee } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    // .then(() => Promise.all(Employee.deleteMany()))
    .then(() => authenticateEmployee(11111, "22222"))
    .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
