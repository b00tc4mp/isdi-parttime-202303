const {
    validators: { validateId, validateText, validateUrl },
    errors: { ExistenceError, PropertyError }
} = require('com')
const { User, Post } = require('../data/models')

module.exports = (userId, postId, image, text) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateUrl(image, 'image url')
    validateText(text, 'post text')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            return Post.findById(postId)
                .then(post => {
                    if (!post) throw new ExistenceError('post not found')

                    if (!post.author.equals(userId)) throw new PropertyError(`post with id ${postId} does not belong to user with id ${userId}`)

                    const newDate = new Date

                    return Post.updateOne({ '_id': postId }, { image: image, text: text, date: newDate })
                })
        })
}