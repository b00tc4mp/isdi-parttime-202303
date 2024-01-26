require('dotenv').config()

const mongoose = require('mongoose')
const removeCommentFromPost = require('./removeCommentFromPost')

mongoose.connect(process.env.MONGODB_URL)

    .then(() => removeCommentFromPost('64b267b560ffe463d8f49a57', '64b2da684987f0fe8abcdb4d', '64b2db6a212079887d712535'))
    .then(result => console.log('removed comment from post'))
    .catch(console.error)
    .finally(mongoose.disconnect)
