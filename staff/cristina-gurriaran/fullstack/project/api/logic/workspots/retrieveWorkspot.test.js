require('dotenv').config()
const mongoose = require('mongoose')
const retrieveWorkspot = require('./retrieveWorkspot')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => retrieveWorkspot("64f7ca9d75c2fa49950ab36e", "64f7cf5b4acc7fc154a37e77"))
    .then(workspot => console.log(workspot))
    .catch(console.error)
    .finally(mongoose.disconnect)