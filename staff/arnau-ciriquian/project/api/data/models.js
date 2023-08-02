const mongoose = require('mongoose')

const { Schema, Schema: { Types: { ObjectId } }, model } = mongoose

const user = new Schema ({
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
        trim: true
    },
    avatar: {
        type: String
    }
})

/*const character = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    },
    missions: {
        type: [ObjectId],
        ref: 'Mission',
    }
    zombiesKilled: {
        type: Number
    }
    level: {
        type: Number,
        required: true
    }
})*/

const mission = new Schema({
    image: {
        type: String,
        required: true
    },
    tittle: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    visibility: {
        type: Boolean,
        default: true,
        required: true
    },
    survivors:{
        type: [ObjectId],
        ref: 'Characters'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const User = model('User', user)
const Mission = model('Mission', mission)

module.exports = {
    User,
    Mission
}