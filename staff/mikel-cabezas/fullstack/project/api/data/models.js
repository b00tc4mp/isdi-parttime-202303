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
const playground = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    images: {
        type: [String],
        required: true,
        minLength: 1
    },
    description: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    creationDate: {
        type: Date,
        required: true,
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
        type: Object,
        required: true,
        unique: true,
        properties: {
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
        }
    },
    elements: {
        type: [Object],
        required: true,
        properties: {
            type: {
                type: String,
                required: true
            },
            minimumAge: {
                type: Number,
                required: true
            }
        }
    },
    sunExposition: {
        type: Array,
        required: false
    },
    issue: {
        type: Object,
        ref: 'User',
        required: true,
        properties: {
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
            isUtil: {
                type: Boolean,
            },
            isSolved: {
                type: Boolean,
                default: false
            },
            comments: {
                type: [Object],
                default: [],
                properties: {
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
                }
            }
        }
    },
})

const User = model('User', user)
const Playground = model('Playground', playground)

module.exports = {
    User,
    Playground
}