require('dotenv').config()
const mongoose = require('mongoose')
const deleteWorkspot = require('./deleteWorkspot')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => deleteWorkspot("64f7ca9d75c2fa49950ab36e", "64f7cefe122999d4937c6faf"))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())

