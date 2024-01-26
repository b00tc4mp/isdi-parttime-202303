const mongoose = require('mongoose')
const { Schema, Schema: { Types: { ObjectId } }, model } = mongoose

//modelo:
const user = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
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
        minLength: 6
    },
    avatar: {
        type: String,
    },
    favs: {
        type: [ObjectId],
        ref: 'Post'
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
    data: {
        type: Date,
        required: true,
        default: Date.now
    },
    likes: {
        type: [ObjectId],
        ref: 'User'
    }

})

const User = model('User', user)
const Post = model('Post', post)

module.exports = {
    User,
    Post,
}