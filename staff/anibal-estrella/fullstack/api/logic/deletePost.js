require('dotenv').config()
const { readFile, writeFile } = require('fs') //commonJS
const { validators: { validateId } } = require('com')
const { User, Post } = require('../data/models.js')


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
        //remove post _id... client only asks for text and image to render
        Post.findById(postId, '-__v -likes').lean(),

    ])
        .then(([user, post]) => {
            if (!user) throw new ExistenceError(`user with the id ${userId} not found`)
            if (!post) throw new ExistenceError(`post with the id ${postId} not found`)

            return Post.deleteOne({ _id: postId })
        })
        .then(() => { })
}
