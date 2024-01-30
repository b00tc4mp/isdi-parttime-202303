const mongoose = require('mongoose')
const { Schema, Schema: { Types: { ObjectId } }, model } = mongoose

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    nickName: {
        type: String,
        required: true,
        unique: true
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
    ipGeoLocation: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [Number], // array of numbers: [longitude, latitude]
            required: true
        }
    },
    city: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "./assets/avatar-default.svg"
    },
    favArtists: {
        type: [ObjectId],
        ref: 'User'
    }
})

const review = ({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    event: {
        type: ObjectId,
        ref: 'Event',
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    text: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },
    images: [String],
    audio: [String],
    video: [String],
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
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
    },
    text: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
    },
    lineUp: {
        type: [String],
        required: true
    },
    dates: [{
        type: Date,
        required: true
    }],
    place: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0
    },
    likes: {
        type: [ObjectId],
        ref: 'User'
    },

})

user.index({ "location": "2dsphere" });


const User = model('User', user)
const Event = model('Event', event)
const Review = model('Review', review)

module.exports = {
    User,
    Event,
    Review
}