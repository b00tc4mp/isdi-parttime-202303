const mongoose = require('mongoose')

const { Schema, Schema: { Types: { ObjectId } }, model } = mongoose

const user = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8
    }
})

const post = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const User = model('User', user)
const Post = model('Post', post)

mongoose.connect('mongodb://127.0.0.1:27017/data')
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    // .then(() => {
    //     return User.create({ name: 'Pepito Grillo\t\n', email: 'pepita@grillo.com', password: '123123123' })
    // })
    // .then(user => {
    //     return Post.create({ author: user.id, image: 'http://image.com/cool', text: 'cool image' })
    // })
    .then(() => {
        const user = new User({ name: 'Pepito Grillo\t\n', email: 'pepita@grillo.com', password: '123123123' })
        const post = new Post({ author: user.id, image: 'http://image.com/cool', text: 'cool image' })

        post.author = user.id

        return Promise.all([user.save(), post.save()])
    })
    .then(([user, post]) => {
        // ...
    })
    .catch(error => {
        console.error(error)
    })
    .finally(() => mongoose.disconnect())