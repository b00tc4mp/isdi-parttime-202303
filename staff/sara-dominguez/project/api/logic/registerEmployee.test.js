require('dotenv').config()

const mongoose = require('mongoose')
const registerEmployee = require('./registerEmployee')


const { Employee } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    // .then(() => Promise.all(Employee.deleteMany()))
    .then(() => registerEmployee('user2', 'Dfirst', 'Bsecond', '01-01-1998', '52345678c', '40123456781', 'Plaza C, 67 1º2 08006 Barcelona', '4644986521', 'ES12 1234 1234 1234 1234 1234', '77777', '01-01-2023', '', '', 'Permanent', 'Manager', 'Rh department', '2', 'Barcelona', null, 'user', '4123121220', 'user2@b-elevenzdb.es', 'authorized', '77777'
    ))
    .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
