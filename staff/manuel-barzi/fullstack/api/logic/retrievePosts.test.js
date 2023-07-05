require('dotenv').config()

const mongoose = require('mongoose')
const retrievePosts = require('./retrievePosts')

mongoose.connect(process.env.MONGODB_URL)
    //.then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => retrievePosts('64a5bd5babaa3bce5d9c6434'))
    .then(posts => console.log(posts))
    .catch(console.error)
    .finally(mongoose.disconnect)