const mongoose = require('mongoose')
const { Schema, mongoose: { Types: { ObjectId } }, model } = mongoose

const message = new Schema ({
    role: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

const conversation = new Schema ({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    messages: {
        type: [message]
    }
}, { timestamps: true })

const user = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
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
    },
    seenLately: {
        type: [ObjectId],
        ref: 'Post'
    },
    postsNumber: {
        type: Number,
        default: 0
    },
    following: {
        type: [Object],
        ref: 'User'
    },
    followers: {
        type: [Object],
        ref: 'User'
    },
    location: {
        type: String,
    },
    occupation: {
        type: String,
    },
    description: {
        type: String
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

const suggestion = new Schema({
    author: {
        type: ObjectId,
        ref:'User',
        required: true
    },
    post: {
        type: ObjectId,
        ref:'Post',
        required: true
    },
    postAuthor: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        requried: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    checked: {
        type: Boolean,
        default: false
    },
    hidden: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const date = new Date

const post = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String,
        require: true,
        trim: true
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
const Suggestion = model('Suggestion', suggestion)
const Conversation = model('Conversation', conversation)
const Message = model('Message', message)

module.exports = {
    User,
    Post,
    Comment,
    Suggestion,
    Conversation,
    Message
}