require('dotenv').config()

const mongoose = require('mongoose')
const retrieveWorkspot = require('./retrieveWorkspot')

const userId = "64ac41995182768d587b4580"


mongoose.connect("mongodb://127.0.0.1:27017/data")
    .then(() => retrieveWorkspot(userId, "64e005e9fa613e5600401f6c"))
    .then(workspot => console.log(workspot))
    .catch(console.error)
    .finally(mongoose.disconnect)