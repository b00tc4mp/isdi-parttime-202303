const mongoose = require('mongoose');

const { Schema, Schema: { Types: { ObjectId } }, model } = mongoose;

const level = new Schema({
    name: {
        type: String,
        required: true,
    },
    layout: {
        type: [[String]],
        required: true,
    },
    hp: {
        type: Number,
        required: true
    },

    author: {
        type: ObjectId,
        required: true
    },

    likes: {
        type: [ObjectId],
        required: true
    },

    date: {
        type: Date,
        required: true,
    },

})

const user = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    avatar: {
        type: String,
        required: true,
    },

    color: {
        type: String,
        required: true,
    },

    recoveryQuestions: [{
        question: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true,
        },
    }],

    joined: {
        type: Date,
        required: true,
    },

    saves: {
        type: [ObjectId],
        required: true
    }

})


const Level = model('Level', level)

const User = model('User', user)

module.exports = {
    Level,
    User,
}