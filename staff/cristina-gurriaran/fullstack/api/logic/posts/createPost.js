const { 
    validators: { validateId, validateUrl, validateText },
    errors: { ExistenceError },
} = require('com')

const { User, Post } = require('../../data/models')



module.exports = (userId, image, location, title, text) => {
    validateId(userId, 'user id')
    validateUrl(image, 'image url')
    validateText(text)

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError(`user with id ${userId} not found`)

            return Post.create({
                author: user._id,
                image,
                location,
                title,
                text,
            })
        })
        .then(() => { })
}
