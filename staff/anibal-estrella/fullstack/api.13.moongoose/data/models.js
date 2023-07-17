const mongoose = require('mongoose')
const { Schema, Schema: { Types: { ObjectId } }, model } = mongoose

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8
    },
    avatar: {
        type: String,
    },
    favs: {
        type: [ObjectId],
        ref: 'User'
    }
})

const post = new Schema({
    author: {
        // to reference anopther object from user
        type: ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        ref: 'User',
        required: true
    },
    text: {
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
    Post
}