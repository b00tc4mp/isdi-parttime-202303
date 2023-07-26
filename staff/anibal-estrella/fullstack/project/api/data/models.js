const mongoose = require('mongoose')
const { Schema, Schema: { Types: { ObjectId } }, model } = mongoose

const paymentMethod = new Schema({
    type: {
        String,
        enum: ['credit-card', 'paypal', 'google-pay', 'crypto']
    },
    number: {
        type: String
    },
    expirityDate: {
        type: Date
    }
})

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
        default: "./assets/avatar-default.svg"
    },
    favs: {
        type: [ObjectId],
        ref: 'User'
    },
    //WARNING: when retrieveUser clean this when client call 
    paymentMethod: [paymentMethod]
})

const comment = ({
    author: {
        // to reference another object from user
        type: ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const post = new Schema({
    author: {
        // to reference another object from user
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
    },
    comments: {
        type: [comment],
    }
})

const User = model('User', user)
const Post = model('Post', post)
const Comment = model('Comment', comment)
const PaymentMethod = model('PaymentMethod', paymentMethod)

module.exports = {
    User,
    Post,
    Comment,
    PaymentMethod
}