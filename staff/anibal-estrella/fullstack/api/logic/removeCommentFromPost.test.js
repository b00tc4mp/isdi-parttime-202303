require('dotenv').config()
const mongoose = require('mongoose')

const removeCommentFromPost = require('./removeCommentFromPost')

mongoose.connect(process.env.MONGODB_URL)
    .then(() =>
        removeCommentFromPost('64aac25c9ef4ef79ca75b01a', '64ac2546d91820fae3964bab',
            '64b8f9688c5d0560234a6f8a'))
    .then(() => console.log('COMMENT REMOVED FROM POST 👍'))
    .catch(console.error)
    .finally(mongoose.disconnect)