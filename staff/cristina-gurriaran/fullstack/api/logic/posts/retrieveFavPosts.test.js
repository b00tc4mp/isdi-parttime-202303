require('dotenv').config()

const mongoose = require('mongoose')
const retrieveFavPosts = require('./retrievePosts')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => retrieveFavPosts("64ac3076cca3c7f9cdb065b0"))
    .then(posts => console.log(posts))
    .catch(console.error)
    .finally(mongoose.disconnect)

