require('dotenv').config()
const mongoose = require('mongoose')
const updateEmployee = require('./updateEmployee')
const { Employee } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    .then(() => updateEmployee('64f63762a661aadfb2b1fe21', '64f638b656010b387c3535d4', 'User B', 'Register B', 'Test', '65789745W', '181234567812', 'Isdi street 70 1 2 08006 Barcelona (Barcelona) Spain', 650253894, 'ES1212341234123412341234', 'https://picsum.photos/id/237/200/', 'Permanent', 'Manager', 'Financial', 3, 'Barcelona', '64dfca2b0a9988ab4c5e4e60', 'Admin', 698201667, 'user2test.register@b-elevenzsd.es', 'Authorized'))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
