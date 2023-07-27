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

const productType = new Schema({
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
    productType: {
        type: [productType]
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

const list = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
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
    notifyAcceptList: {
        type: [ObjectId],
        ref: 'User'
    },
    notifyChatUpdate: {
        type: [ObjectId],
        ref: 'User'
    },
    chat:{
        type: [chat]
    },
    products:{
        type: [product]
    }
})

const User = model('User', user)
const Store = model('Store', store)
const ProductType = model('ProductTypes', productType)
const Chat = model('Chat', chat)
const Product = model('Product', product)
const List = model('List', list)

module.exports = {
    User,
    Store,
    ProductType,
    Chat,
    Product,
    List
}