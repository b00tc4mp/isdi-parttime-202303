const mongoose = require('mongoose')
const { Schema, mongoose: { Types: { ObjectId } }, model } = mongoose

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
        require: true,
        trim: true
    },
    avatar: {
        type: String
    },
    favs: {
        type: [ObjectId],
        ref: 'Post'
    }
})

const comment = new Schema({
    author: {
        type: String,
        required: true
    },
    authorId: {
        type: ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

const date = new Date

const post = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
        default: date.toLocaleDateString()
    },
    likes: {
        type: [ObjectId],
        ref: 'User'
    },
    visible: {
        type: Boolean,
        default: true
    },
    comments: {
        type: [comment]
    }
})

const User = model('User', user)
const Post = model('Post', post)
const Comment = model('Comment', comment)

module.exports = {
    User,
    Post,
    Comment
}