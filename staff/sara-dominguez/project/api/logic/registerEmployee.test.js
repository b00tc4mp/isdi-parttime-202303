require('dotenv').config()

const mongoose = require('mongoose')
const registerEmployee = require('./registerEmployee')


const { Employee } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    // .then(() => Promise.all(Employee.deleteMany()))
    .then(() => registerEmployee('Frida', 'Dfirst', 'Bsecond', '01-01-1998', '22345678A', '00123456789', 'Plaza C, 67 1º2 08006 Barcelona', '644986522', 'ES12 1234 1234 1234 1234 1234', '11111', '01-01-2023', '', '', 'Permanent', 'Manager', 'Rh department', '3', 'Barcelona', null, 'user', '123121223', 'frida@b-elevenzdb.es', 'authorized', '22223'
    ))
    .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
