const { ObjectId } = require('mongodb')
const context = require('./context')
const { errors: { ExistanceError } } = require('com')

module.exports = function createPost(userId, image, text) {

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new ExistanceError(`User with id ${userId} not found`)

            return posts.insertOne({
                author: new ObjectId(userId),
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