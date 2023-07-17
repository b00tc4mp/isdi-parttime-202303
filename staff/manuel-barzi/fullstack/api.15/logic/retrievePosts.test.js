require('dotenv').config()

const mongoose = require('mongoose')
const retrievePosts = require('./retrievePosts')

mongoose.connect(process.env.MONGODB_URL)
    //.then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => retrievePosts('64aef3223feaa7a159f05c20'))
    .then(posts => console.log(posts))
    .catch(console.error)
    .finally(mongoose.disconnect)