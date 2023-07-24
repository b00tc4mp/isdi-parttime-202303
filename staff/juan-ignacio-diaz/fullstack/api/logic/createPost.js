const { 
    validators: { validateId, validateUrl, validateText },
    errors: { ExistenceError } 
} = require('com')

const { User, Post } = require('../data/models')
const { connections } = require('mongoose')

module.exports = (userId, image, text) => {
    validateId(userId, 'user id')
    validateUrl(image, 'image url')
    validateText(text, 'text')

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new ExistenceError('user not found')

        await Post.create({
                author: user._id,
                image,
                text,
                date: new Date,
                dateLastModified: '',
                likes: [],
                lock: false,
                price: 0
            })
    })()

}