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
        type: String,
        default: 'data:image/jpeg;base64,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'
    },
    favs: {
        type: [ObjectId],
        ref: 'Post'
    },
    seenLately: {
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