require('dotenv').config()

const mongoose = require('mongoose')
const addReviewToWorkspot = require('./addReviewToWorkspot')

mongoose.connect("mongodb://127.0.0.1:27017/data")
    .then(() => addReviewToWorkspot('64ac41995182768d587b4580', '64e00534fa613e5600401f5e', 'FIRST REVIEW TEXT blablabla'))
    .then(result => console.log('review added'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())