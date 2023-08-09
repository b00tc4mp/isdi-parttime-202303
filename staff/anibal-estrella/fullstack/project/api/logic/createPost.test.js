require('dotenv').config()
const createPost = require('./createPost')
const mongoose = require('mongoose')
const { User, Post } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)
    .then(() =>
        createPost('64aa892fae321e180c2c6402', 'https://picsum.photos/1500?random=1',
            'Mauris sollicitudin fermentum libero. Pellentesque habitant morbi ucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Aenean imperdiet.'))
    .then(() => console.log('POST CREATED 👍'))
    .catch(console.error)
    .finally(mongoose.disconnect)