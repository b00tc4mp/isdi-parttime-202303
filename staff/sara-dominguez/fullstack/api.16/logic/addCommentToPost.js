const { validators: { validateId, validateUrl, validateText } } = require('com')
const { User, Post, Comment } = require('../data/models')

module.exports = (userId, postId, text) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateText(text)

    return Promise.all([
        User.findById(userId),
        Post.findById(postId)
    ])
        .then(([user, post]) => {
            if (!user) throw new Error(`user with id ${userId} not found`)
            if (!post) throw new Error(`post with id ${postId} not found`)

            const comment = new Comment({
                author: userId,
                text
            })

            post.comments.push(comment)

            return post.save()
        })
        .then(() => { })
}