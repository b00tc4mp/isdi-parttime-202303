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

const achivements = new Schema({
    user: {
        type: ObjectId,
        required: true
    },

    progressByAchivement: [
        {
            name: 'riderOnTheMaking',
            description: 'play levels',
            category: 'game',
            ranks: [10, 50, 100],
            progress: {
                type: Number
            },
            completed: false
        },
        {
            name: 'AlTheBuilder',
            description: 'post levels',
            category: 'create',
            ranks: [1, 5, 25],
            progress: {
                type: Number
            },
            completed: false
        },
        {
            name: 'akaAlice',
            description: 'enter holes',
            category: 'game',
            ranks: [25, 100, 500],
            progress: {
                type: Number
            },
            completed: false
        },
        {
            name: 'riderExpertise',
            description: 'beat levels',
            category: 'game',
            ranks: [5, 25, 75],
            progress: {
                type: Number
            },
            completed: false
        },
        {
            name: 'junkrat',
            description: 'explode bombs',
            category: 'game',
            ranks: [25, 100, 500],
            progress: {
                type: Number
            },
            completed: false
        },
        {
            name: 'kitten',
            description: 'beat a level with full health',
            category: 'game',
            ranks: [5, 25, 100],
            progress: {
                type: Number
            },
            completed: false
        },
        {
            name: 'psycho',
            description: 'put bombs in levels',
            category: 'create',
            ranks: [50, 500, 1000],
            progress: {
                type: Number
            },
            completed: false
        },
        {
            name: 'angel',
            description: 'put life in levels',
            category: 'create',
            ranks: [50, 500, 1000],
            progress: {
                type: Number
            },
            completed: false
        },
        {
            name: 'hardWorker',
            description: 'earn CC',
            category: 'game',
            ranks: [1000, 5000, 10000],
            progress: {
                type: Number
            },
            completed: false
        },
        {
            name: 'shopalcoholic',
            description: 'spend CC',
            category: 'create',
            ranks: [1000, 5000, 10000],
            progress: {
                type: Number
            },
            completed: false
        },
        {
            name: 'influencer',
            description: 'earn follows',
            category: 'social',
            ranks: [5, 10, 15],
            progress: {
                type: Number
            },
            completed: false
        },
        {
            name: 'stalker',
            description: 'follow people',
            category: 'social',
            ranks: [5, 10, 15],
            progress: {
                type: Number
            },
            completed: false
        },
        {
            name: 'newLook',
            description: 'change your avatar',
            category: 'social',
            ranks: [-1],
            progress: {
                type: Number
            },
            completed: false
        },
        {
            name: 'newbie',
            description: 'play the tutorial',
            category: 'game',
            ranks: [-1],
            progress: {
                type: Number
            },
            completed: false
        },
        {
            name: 'onTheAlbum',
            description: 'save a level',
            category: 'social',
            ranks: [-1],
            progress: {
                type: Number
            },
            completed: false
        },
        {
            name: 'butWhy?',
            description: 'create a level with max floors',
            category: 'create',
            ranks: [-1],
            progress: {
                type: Number
            },
            completed: false
        },
        {
            name: 'veteran',
            description: 'have a month old account',
            category: 'social',
            ranks: [-1],
            progress: {
                type: Number
            },
            completed: false
        },
    ]
})


const Level = model('Level', level)

const User = model('User', user)

const Achivements = model('Achivements', achivements)

module.exports = {
    Level,
    User,
    Achivements
}