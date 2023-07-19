require('dotenv').config()

const mongoose = require('mongoose')
const removeCommentFromPost = require('./removeCommentFromPost')

mongoose.connect(process.env.MONGODB_URL)
    //.then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => removeCommentFromPost('64aef3223feaa7a159f05c20', '64aef3522745ebdbab8406c6', '64aef3ac6cc1207fa284d4de'))
    .then(result => console.log('removed'))
    .catch(console.error)
    .finally(mongoose.disconnect)