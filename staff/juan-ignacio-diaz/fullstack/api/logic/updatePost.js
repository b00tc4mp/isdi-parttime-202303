const { 
    validators: { validateId, validateUrl, validateText },
    errors: { ExistenceError, AuthError }
} = require('com')

const { User, Post } = require('../data/models')

module.exports = (userId, postId, image, text) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    if(image !== '') validateUrl(image)
    if(text !== '') validateText(text)

    return (async () => { 
        const [user, post] = await Promise.all([User.findById(userId), Post.findById(postId)])

        if (!user) throw new ExistenceError('user not found')

        if (!post) throw new ExistenceError('post not found')

        if (user._id.toString() !== post.author.toString())
            throw new AuthError(`Post doesn't belong to this user`)

        if(image === '') image = post.image
        if(text === '')  text = post.text

        await Post.findByIdAndUpdate(postId, { $set: { image: image, text: text, dateLastModified: new Date }})
    })()
}