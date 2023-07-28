const mongoose = require('mongoose')
const { Schema, Schema: { Types: { ObjectId } }, model } = mongoose

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
        required: true,
        minLength: 8
    },
    image: {
        type: String
    },
    favs: {
        type: [ObjectId],
        default: []
    }
})
const comments = new Schema({
    _id: {
        type: ObjectId,
        required: true,
        unique: true
    },
    author: {
        type: ObjectId,
        required: true
    },
    isUtil: {
        type: Boolean,
    },
    comment: {
        type: String,
        required: true,
        maxLength: 200
    }
})
const location = new Schema({
    type: {
        type: String,
        default: 'Point',
        required: true
    },
    coordinates: {
        type: Array,
        length: 2,
        required: true
    }
})
const element = new Schema({
    element: {
        type: String,
        required: true
    },
    minimumAge: {
        type: Number,
        required: true
    }
})
const issue = new Schema({
    _id: {
        type: ObjectId,
        required: true,
        unique: true
    },
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: [String],
        required: true
    },
    isSolved: {
        type: Boolean,
        default: false
    },
    comments: {
        type: [comments]
    }
})

const playground = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    images: {
        type: [String],
        required: true,
        minLength: 1
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    lastModify: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: [ObjectId],
        ref: 'User',
        required: false
    },
    visibility: {
        type: String,
        default: 'public',
        required: true
    },
    location: {
        type: location,
        required: true,
        unique: true,

    },
    elements: {
        type: [element],
        required: true,
    },
    sunExposition: {
        type: Array,
        required: false
    },
    issue: {
        type: [issue],
        ref: 'User',
        required: true,
    },
})


const User = model('User', user)
const Playground = model('Playground', playground)

module.exports = {
    User,
    Playground
}