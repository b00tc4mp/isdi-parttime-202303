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
    },

    follows: {
        type: [ObjectId],
        required: true
    },

    followers: {
        type: [ObjectId],
        required: true
    },

    cc: {
        type: Number,
        required: true
    }

})


const achivementProgress = new Schema({
    code: {
        type: String,
    },

    name: {
        type: String,
    },

    description: {
        type: String,
    },

    category: {
        type: String,
    },

    ranks: {
        type: [Number],
    },

    progress: {
        type: Number,
    },

    isRankReached: {
        type: Boolean,
    },

    completed: {
        Boolean,
    },
})

const achivements = new Schema({
    user: {
        type: ObjectId,
        required: true
    },

    progressByAchivement: {
        type: [achivementProgress]
    }
})

const Level = model('Level', level)

const User = model('User', user)

const Achivements = model('Achivements', achivements)

module.exports = {
    Level,
    User,
    Achivements
}