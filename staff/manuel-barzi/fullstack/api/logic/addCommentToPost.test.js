require('dotenv').config()

const mongoose = require('mongoose')
const addCommentToPost = require('./addCommentToPost')

mongoose.connect(process.env.MONGODB_URL)
    //.then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => addCommentToPost('64aef3223feaa7a159f05c20', '64aef3522745ebdbab8406c6', 'smile again'))
    .then(result => console.log('created'))
    .catch(console.error)
    .finally(mongoose.disconnect)