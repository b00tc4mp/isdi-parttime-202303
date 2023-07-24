require('dotenv').config()
const mongoose = require('mongoose')


const updateEmployeeAvatar = require('./updateEmployeeAvatar')
const { Employee } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    .then(() => updateEmployeeAvatar('64b57ebe2727a4da766febca', 'https://picsum.photos/246/200'
    ))
    .then((result) => console.log(result))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
