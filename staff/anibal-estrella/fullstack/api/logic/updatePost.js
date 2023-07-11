const {
    errors: { ExistenceError, ContentError },
    validators: { validateText, validateUrl, validateId } } = require('com')

const { User, Post } = require('../data/models.js')

/**
 * 
 * @param {*} userId the user's ID
 * @param {*} postId the post's ID
 * @param {*} image the Post's image
 * @param {*} text the Post's text
 * @returns 
 */

module.exports = (userId, postId, image, text) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateUrl(image, 'Image URL')
    validateText(text, 'Post text')

    return Promise.all([
        User.findById(userId).lean(),
        //remove post _id... client only asks for text and image to render
        Post.findById(postId, '-_id -__v -likes').lean(),

    ])
        .then(([user, post]) => {
            if (!user) throw new ExistenceError(`user with the id ${userId} not found`)
            if (!post) throw new ExistenceError(`post with the id ${postId} not found`)

            return Post.updateOne(
                {
                    image: image,
                    text: text,
                    date: new Date()
                })
        })
        .then(() => { })
}

