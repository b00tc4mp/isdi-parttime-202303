const { 
    validators: { validateId, validateUrl, validateText },
    errors: { ExistenceError, PermitError }
 } = require('com')
const { User, Post } = require('../../data/models')


module.exports = (userId, postId, image, location, title, text) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateUrl(image, 'image url')
    validateText(text)

    return (async () => {
        const user = await User.findById(userId).lean()

        if (!user) throw new ExistenceError(`User with id ${userId} not found`)

        const post = Post.findById(postId)

        if (!post) throw new ExistenceError(`Post with id ${postId} not found`)

        return Post.updateOne({ _id: postId }, { $set: { image: image, location: location, title: title, text: text }, })
    })()
}


