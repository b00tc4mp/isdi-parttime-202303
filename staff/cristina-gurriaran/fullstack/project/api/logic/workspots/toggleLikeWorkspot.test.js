require('dotenv').config()
const mongoose = require('mongoose')
const toggleLikeWorkspot = require('./toggleLikeWorkspot')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => toggleLikeWorkspot('64f7d4be463b34a38092c588', '64f7cf5b4acc7fc154a37e77'))
    .then(post => console.log(post))
    .catch(console.error)
    .finally(mongoose.disconnect)

