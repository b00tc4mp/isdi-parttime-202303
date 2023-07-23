require('dotenv').config()

const mongoose = require('mongoose')
const addCommentToPost = require('./addCommentToPost')

    // mongoose.connect(process.env.MONGODB_URL)

    //     .then(() => addCommentToPost('64b267b560ffe463d8f49a57', '64b2da684987f0fe8abcdb4d', 'Smile'))
    //     .then(result => console.log('Added comment to post'))
    //     .catch(console.error)
    //     .finally(mongoose.disconnect)

    ; (async () => {
        try {
            await mongoose.connect(process.env.MONGODB_URL)

            await addCommentToPost('64bc18ea11de93dac6e62282', '64bc18fa11de93dac6e62286', 'Smiless')

            console.log('Added comment to post')
        } catch {
            console.log(error)
        } finally {
            mongoose.disconnect()
        }
    })()