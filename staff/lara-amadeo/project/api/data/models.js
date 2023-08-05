const mongoose = require('mongoose')

const { Schema, Schema: { Types: { ObjectId } }, model } = mongoose

const item = new Schema({
    meal: {
        type: ObjectId,
        ref: 'Meal',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
})

const order = new Schema({
    items: {
        type: [item],
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

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
    cart: {
        type: [item]
    },
    order: {
        type: [order],
    },
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
    title: {
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
    categories: {
        type: [String],
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    quantity: {
        type: String,
        require: true,
        default: 0
    },
    bestBefore: {
        type: String,
        required: true,
        default: 0
    },
    price: {
        type: String,
        require: true,
        default: 0
    }
})

const User = model('User', user)
const Meal = model('Meal', meal)

const Item = model('Item', item)
const Order = model('Order', order)

module.exports = {
    User,
    Meal,
    Item,
    Order
}