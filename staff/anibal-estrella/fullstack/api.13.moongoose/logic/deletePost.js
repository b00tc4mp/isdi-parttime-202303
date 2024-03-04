require('dotenv').config()
const { readFile, writeFile } = require('fs') //commonJS
const { User, Post } = require('../data/models.js')
const {
    errors: { ExistenceError },
    validators: { validateId } } = require('com')


/**
 * Deletes a post and all its data, updates data in the database (users, posts)
 *
 * @param {string} userId The user's ID
 * @param {string} postId The post's ID
 */

module.exports = (userId, postId) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    return Promise.all([
        User.findById(userId).lean(),
        Post.findById(postId).lean(),

    ])
        .then(([user, post]) => {
            if (!user) throw new ExistenceError(`user with the id ${userId} not found`)
            if (!post) throw new ExistenceError(`post with the id ${postId} not found`)

            return Post.deleteOne({ _id: postId })
        })
        .then(() => { })
}
