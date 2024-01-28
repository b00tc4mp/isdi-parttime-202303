require('dotenv').config()

const mongoose = require('mongoose')
const retrievePost = require('./retrievePost')

mongoose.connect(process.env.MONGODB_URL)
    //.then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => retrievePost('64a709a40e1f16e045ccd040', '64a70aeb79cc701176d3fc0f'))
    .then(post => console.log(post))
    .catch(console.error)
    .finally(mongoose.disconnect)