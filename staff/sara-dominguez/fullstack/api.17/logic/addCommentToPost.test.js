require('dotenv').config()

const mongoose = require('mongoose')
const addCommentToPost = require('./addCommentToPost')

mongoose.connect(process.env.MONGODB_URL)

    .then(() => addCommentToPost('64b267b560ffe463d8f49a57', '64b2da684987f0fe8abcdb4d', 'Smile'))
    .then(result => console.log('Added comment to post'))
    .catch(console.error)
    .finally(mongoose.disconnect)
