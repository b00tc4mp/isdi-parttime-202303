const mongoose = require('mongoose')

const { Schema, Schema: { Types: { ObjectId } }, model } = mongoose

const user = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
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
        trim: true
    },
    description: {
        type: String,
        default: "Start by writing a bit about yourself, this helps other users to get to know you"
    },
    tags: {
        type: [String],
        default: "Write some tags about your lifestyle. p.e. Healthy, Sporty, Diet..."
    },
    avatar: {
        type: String,
        default: "https://i.pinimg.com/550x/57/70/f0/5770f01a32c3c53e90ecda61483ccb08.jpg"
    },
    availability: {
        type: [Object],
        default: []
    },
    location: {
        type: String,
        default: "No location yet"
    },
    likedChefs: {
        type: [ObjectId],
        ref: 'User',
        default: []
    },
    meals: {
        type: [Object],
        ref: 'Meal',
        default: []
    }
    ,
    reviews: {
        type: [Object],
        default: []
    }
})

const meal = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    images: {
        type: [String],
        required: true,
    },
    text: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    category: {
        type: [String],
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    bestBefore: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        require: true,
        default: 0
    }
})

const User = model('User', user)
const Meal = model('Meal', meal)

module.exports = {
    User,
    Meal
}