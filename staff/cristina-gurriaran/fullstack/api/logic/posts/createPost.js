const { 
    validators: { validateId, validateUrl, validateText },
    errors: { ExistenceError },
} = require('com')

const { User, Post } = require('../../data/models')



module.exports = (userId, image, location, title, text) => {
    validateId(userId, 'user id')
    validateUrl(image, 'image url')
    validateText(text)

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError(`user with id ${userId} not found`)

        return Post.create({
            author: userId,
            image,
            location,
            title,
            text,
        })
    })()
}
