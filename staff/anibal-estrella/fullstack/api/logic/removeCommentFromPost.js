const {
    errors: { ExistenceError },
    validators: { validateText, validateId } } = require('com')

const { User, Post, CommentId } = require('../data/models.js')

/**
 * Creates a new post and updates the posts DB
 * @param {string} userId the user's ID
 * @param {postId} postId the post's ID
 * @param {commentId} commentId  the comments's ID
 */

module.exports = (userId, postId, commentId) => {
    validateId(userId, 'user id')
    validateId(postId, 'Post id')
    validateId(commentId, 'Comment id')

    return Promise.all([
        User.findById(userId),
        Post.findById(postId)
    ])
        .then(([user, post]) => {
            if (!user) throw new ExistenceError(`user with the id ${userId} not found`)
            if (!post) throw new ExistenceError(`post with the id ${postId} not found`)

            const index = post.comments.findIndex(comment => comment.id === commentId)

            if (index < 0)
                throw new Error(`COMMENT with the ID ${commentId} not found in POST with the ID: ${postId}`)

            const comment = post.comments[index]
            // does this comment belongs to the current user?
            if (comment.author.toString() !== userId)
                throw new Error(`COMMENT with the ID ${commentId} does not belongs to the USER with the ID: ${userId}`)
            //remove just 1 object in the index of the comments array,
            post.comments.splice(index, 1)

            return post.save()

        })
        .then(() => { })
}


