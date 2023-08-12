const mongoose = require('mongoose')

const { Schema, Schema: { Types: { ObjectId } }, model } = mongoose

const administrator = new Schema({
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
    }
})

const update = new Schema({
    author: {
        type: ObjectId,
        ref: 'Administrator',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    text: {
        type: String,
        required: true
    },
    rsstext: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    visibility: {
        type: Boolean,
        required: true,
        default: true
    }
})

const event = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    location: {
        type: String,
        required: false
    },
    text: {
        type: String,
        required: true
    },
    links: {
        type: [String],
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    visibility: {
        type: Boolean,
        required: true,
        default: true
    }
})

const lyricPost = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    media: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    songInfo: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    visibility: {
        type: Boolean,
        required: true,
        default: true
    }
})

const message = new Schema ({
    author: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    }
})

const usersData = new Schema ({
    usersMail: {
        type: String,
        required: true
    }
})

const socialNetworks = new Schema ({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
})

const Administrator = model('Administrator', administrator)
const Update = model('Update', update)
const Event = model('Event', event)
const LyricPost = model('LyricPost', lyricPost)
const Message = model('Message', message)
const UsersData = model('UsersData', usersData)
const SocialNetworks = model('SocialNetworks', socialNetworks)

module.exports = {
    Administrator,
    Update,
    Event,
    LyricPost,
    Message,
    UsersData,
    SocialNetworks
}