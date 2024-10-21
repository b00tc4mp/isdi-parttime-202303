const {
    errors: { ExistenceError },
    validators: { validateText, validateId } } = require('com')

const { User, Post, Comment } = require('../data/models.js')

/**
 * Creates a new post and updates the posts DB
 * @param {string} userId the user's ID
 * @param {postId} postId the post's ID
 * @param {string} text  the Post's text
 */

module.exports = (userId, postId, text) => {
    validateId(userId, 'user id')
    validateId(postId, 'Post id')
    validateText(text, 'comment\'s text')

    return Promise.all([
        User.findById(userId),
        Post.findById(postId)
    ])
        .then(([user, post]) => {
            if (!user) throw new ExistenceError(`user with the id ${userId} not found`)
            if (!post) throw new ExistenceError(`post with the id ${postId} not found`)
            //save comment in memory
            const comment = new Comment({
                author: userId,
                text
            })
            // push comment to the postId's comments property 
            post.comments.push(comment)
            // save the post with the new comment to db
            return post.save()
        })
        .then(() => { })
}


