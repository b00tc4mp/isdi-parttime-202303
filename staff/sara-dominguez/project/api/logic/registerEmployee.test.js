require('dotenv').config()

const mongoose = require('mongoose')
const registerEmployee = require('./registerEmployee')


const { Employee } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    // .then(() => Promise.all(Employee.deleteMany()))
    .then(() => registerEmployee('userDenied2', 'Dfirst', 'Bsecond', '01-01-1998', '42345678c', '30123456781', 'Plaza C, 67 1º2 08006 Barcelona', '3644986521', 'ES12 1234 1234 1234 1234 1234', '66666', '01-01-2023', '', '', 'Permanent', 'Manager', 'Rh department', '2', 'Barcelona', null, 'user', '3123121220', 'userDenied2@b-elevenzdb.es', 'denied', '66666'
    ))
    .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
