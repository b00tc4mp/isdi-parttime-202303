require('dotenv').config()
const mongoose = require('mongoose')

const { User } = require('../data/models')
const updateUserPassword = require('./updateUserPassword')

mongoose, connect(process.env.MONGODB_URL)

    .then(() => updateUserPassword('64a71f96f2a0dffa7b4caa49', 'Aa-1234', 'Ab-1234', 'AB-1234'))
    .then(user => {
        return User.updateOne({ _id: user.id }, { $set: { avatar: user.password } })
    })