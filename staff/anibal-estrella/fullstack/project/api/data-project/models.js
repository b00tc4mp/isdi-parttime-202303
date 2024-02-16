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

const event = new Schema({
    author: {
        // to reference another object from user
        type: ObjectId,
        ref: 'User',
        required: true
    },
    poster: {
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
    description: {
        type: String,
        required: true,
        trim: true,
        minLength: 10
    },
    lineUp: {
        type: [ObjectId],
        ref: 'Artist',
        minLength: 1,
        required: true
    },
    dates: [{
        type: Date,
        minLength: 1,
        required: true
    }],
    place: {
        type: ObjectId,
        ref: 'Place',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    likes: {
        type: [ObjectId],
        ref: 'User'
    },
    eventReviews: {
        type: [ObjectId],
        ref: 'EventReview',
        required: true
    },
})

const artist = new Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
        required: true
    }
})

const eventReview = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
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
    image: [String],
    audio: [String],
    video: [String],
})

const scoreStats = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    avgScore: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
});

const place = new Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
})

user.index({ "ipGeoLocation.coordinates": "2dsphere" });

const User = model('User', user)
const Event = model('Event', event)
const Artist = model('Artist', artist)
const EventReview = model('EventReview', eventReview)
const Place = model('Place', place)
const ScoreStats = model('ScoreStats', scoreStats);

module.exports = {
    User,
    Event,
    Artist,
    EventReview,
    Place,
    ScoreStats
}