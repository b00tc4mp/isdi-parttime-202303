require('dotenv').config()

const mongoose = require('mongoose')
const removeCommentFromPost = require('./removeCommentFromPost')

mongoose.connect(process.env.MONGODB_URL)

    .then(() => removeCommentFromPost('64bc18ea11de93dac6e62282', '64bc18fa11de93dac6e62286', '64bc190d11de93dac6e6228a'))
    .then(result => console.log('removed comment from post'))
    .catch(console.error)
    .finally(mongoose.disconnect)
