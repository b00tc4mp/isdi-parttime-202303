const mongoose = require('mongoose')
const { Schema, Schema: { Types: { ObjectId } }, model } = mongoose

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    nickName: {
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
    favArtists: {
        type: [ObjectId],
        ref: 'User'
    },
    //WARNING: when retrieveUser clean this when client call 
    paymentMethod: [paymentMethod]
})

const review = ({
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
    image: {},
    audio: {},
    video: {},
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const event = new Schema({
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
    reviews: {
        type: [review],
    }
})

const User = model('User', user)
const Event = model('Event', event)
const Review = model('Review', review)

module.exports = {
    User,
    Event,
    Review
}