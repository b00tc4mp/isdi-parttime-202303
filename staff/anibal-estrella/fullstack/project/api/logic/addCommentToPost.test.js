require('dotenv').config()
const mongoose = require('mongoose')

const addCommentToPost = require('./addCommentToPost')

mongoose.connect(process.env.MONGODB_URL)
    .then(() =>
        addCommentToPost('64aac25c9ef4ef79ca75b01a', '64ac2546d91820fae3964bab',
            'Mauris sollicitudin fermentum libero. Pellentesque habitant morbi ucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Aenean imperdiet.'))
    .then(() => console.log('COMMENT ADDED TO POST 👍'))
    .catch(console.error)
    .finally(mongoose.disconnect)