const { errors: { ExistanceError } } = require('com')
const { User, Post } = require('../data/models')

module.exports = function createPost(userId, image, text) {
    return User.findOne({ _id: userId })
        .then(user => {
            if (!user) throw new ExistanceError(`User with id ${userId} not found`)

            return Post.create({
                author: userId,
                image,
                text,
                date: new Date,
                visibility: 'private',
                price: 0,
                likes: [],
                saves: []
            })
        })
}