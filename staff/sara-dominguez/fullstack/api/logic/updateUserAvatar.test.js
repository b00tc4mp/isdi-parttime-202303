require('dotenv').config()
const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const updateUserAvatar = require('./updateUserAvatar')
const { User } = require('../data/models')

mongoose.connect(process.env.MONGODB_URL)

    .then(() => updateUserAvatar('64a71f96f2a0dffa7b4caa49', 'https://picsum.photos/245/200'
    ))
    .then((user) => {
        if (!user) throw new TypeError('User not found')

        return User.updateOne({ _id: user.id }, { $set: { avatar: user.avatar } })
    })
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())
