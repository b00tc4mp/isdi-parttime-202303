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

const stores = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
})

const productTypes = new Schema({
    name: {
        type: String,
        enum: ['drogeria', 'carniceria', 'pescaderia', 'congelados', 'panaderia', 'pasteleria']
    }
})

const chat = new Schema({
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
    }
})

const products = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    howMany: {
        type: Number,
        required: true
    },
    estimatedPrice: {
        type: Number
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number
    },
    dateOfPurchase: {
        type: Date,
        required: true,
        default: Date.now
    },
    authorOfPurchase: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    state: {
        type: Number
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
        type: [productTypes]
    },
    comment: {
        type: String,
        required: true
    },
    notifyProductUpdate: {
        type: [ObjectId],
        ref: 'User'
    }
})

const lists = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    users: {
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
    notifyChatUpdate: {
        type: [ObjectId],
        ref: 'User'
    },
    chat:{
        type: [chat]
    },
    products:{
        type: [products]
    }
})

const User = model('User', user)
const Stores = model('Stores', stores)
const ProductTypes = model('ProductTypes', productTypes)
const Chat = model('Chat', chat)
const Products = model('Products', products)
const Lists = model('Lists', lists)

module.exports = {
    User,
    Stores,
    ProductTypes,
    Chat,
    Products,
    Lists
}