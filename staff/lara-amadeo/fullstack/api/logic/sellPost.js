const { errors: { ExistanceError } } = require('com')
const { User, Post } = require('../data/models')

module.exports = function sellPost(userId, postId, newPrice) {

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistanceError(`User with id ${userId} not found`)

            return Post.updateOne({ _id: postId }, { price: newPrice })
        })
}