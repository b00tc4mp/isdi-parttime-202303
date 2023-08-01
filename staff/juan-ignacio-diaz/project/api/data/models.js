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
        trim: true,
        minLength: 8
    },
    avatar: {
        type: String
    },
    mode: {
        type: String
    },
    contacts: {
        type: [ObjectId],
        ref: 'User'
    }
})

const store = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
})

const message = new Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    view: {
        type: [ObjectId],
        ref: 'User'
    }
})

const product = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    howMany: {
        type: Number,
        required: true
    },
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    state: {
        type: Number,
        enum: ['', 'selected', 'bought']
    },
    price: {
        type: Number
    },
    date: {
        type: Date,
    },
    buyer: {
        type: ObjectId,
        ref: 'User'
    },
    likes: {
        type: [ObjectId],
        ref: 'User'
    },
    stores: {
        type: [ObjectId],
        ref: 'Stores'
    },
    type: {
        type: String,
        enum: ['drogeria', 'carniceria', 'pescaderia', 'congelados', 'panaderia', 'pasteleria']
    },
    comment: {
        type: String
    },
    view: {
        type: [ObjectId],
        ref: 'User'
    }
})

const list = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    owner: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    guests: {
        type: [ObjectId],
        ref: 'User'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateToEnd: {
        type: Date,
        required: true
    },
    invited: {
        type: [ObjectId],
        ref: 'User'
    },
    messages:{
        type: [message]
    },
    stores:{
        type: [store]
    },
    products:{
        type: [product]
    }
})

const User = model('User', user)
const Store = model('Store', store)
const Message = model('Message', message)
const Product = model('Product', product)
const List = model('List', list)

module.exports = {
    User,
    Store,
    Message,
    Product,
    List
}