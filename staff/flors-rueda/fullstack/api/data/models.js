const mongoose = require('mongoose')

const { Schema, Schema: { Types: { ObjectId } }, model } = mongoose

const user = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    mail: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String
    },
    favs: {
        type: [ObjectId],
        ref: 'Post',
        default: []
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
        required: true,
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
    public: {
        type: Boolean,
        required: true,
        default: true
    },
    likes: {
        type: [ObjectId],
        ref: 'User',
        default: []
    },
    edited: {
        type: [Date],
        default: []
    }
})

const User = model('User', user)
const Post = model('Post', post)

module.exports = {
    User,
    Post
}