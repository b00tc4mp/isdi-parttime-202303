require('dotenv').config()
const mongoose = require('mongoose')
const addReviewToWorkspot = require('./addReviewToWorkspot')


mongoose.connect(process.env.MONGODB_URL)
    .then(() => addReviewToWorkspot("64f7ca9d75c2fa49950ab36e", "64f7cf5b4acc7fc154a37e77", 'Review test 2'))
    .then(console.log('review added'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())