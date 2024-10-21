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

    return Promise.all([User.findById(userId), Post.findById(postId)])
        .then(([user, post]) => {
            if (!user) throw new ExistenceError('User not found! 😥')

            if (!post) throw new ExistenceError('Post not found! 😥')

            if (post.author.toString() !== userId) {
                throw new PropertyError(
                    `Post with ID ${post._id.toString()} does not belong to user with ID ${userId} 😥`
                )
            }

            return User.find({ favs: postId }).then((users) => {
                const usersUpdated = users.map((user) => {
                    return User.updateOne(
                        { _id: user.id },
                        {
                            $pullAll: {
                                favs: [postId],
                            },
                        }
                    )
                })

                return Promise.all([...usersUpdated, Post.deleteOne({ _id: postId })])
            })
        })
        .then(() => { })
}