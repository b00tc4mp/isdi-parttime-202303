require('dotenv').config()
const updatePost = require('./updatePost')
const mongoose = require('mongoose')
const { User, Post } = require('../data/models')

function getRandomNumber() {
    return Math.floor(Math.random() * 99) + 1;
}
const randomNumber = getRandomNumber();
const userId = '64aa892fae321e180c2c6402'
const postId = '64ac2546d91820fae3964bae'
const image = `https://picsum.photos/1500?random=${randomNumber}`
const text = '/// UPDATED2 /// Mauris sollicitudin fermentum libero. Pellentesque habitant morbi ucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Aenean imperdiet.'

mongoose.connect(process.env.MONGODB_URL)
    .then(() =>
        updatePost(userId, postId, image, text))
    .then(() => console.log('POST UPDATED 👍'))
    .catch(console.error)
    .finally(mongoose.disconnect)