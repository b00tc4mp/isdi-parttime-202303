require('dotenv').config()
const { Employee } = require('../data/models')
const mongoose = require('mongoose')
const authenticateEmployee = require('./authenticateEmployee')

mongoose.connect(process.env.MONGODB_URL)

    // .then(() => Promise.all(Employee.deleteMany()))
    .then(() => authenticateEmployee("10001", "Be-10001"))
    .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
