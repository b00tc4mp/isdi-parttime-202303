const { 
    validators: { validateId, validateUrl, validateText },
    errors: { ExistenceError, AuthError } 
} = require('com')

const { User, Post } = require('../data/models')

module.exports = (userId, image, text) => {
    validateId(userId, 'user id')
    validateUrl(image, 'image url')
    validateText(text, 'text')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            return Post.Create({
                    author: userId,
                    image,
                    text,
                    date: new Date,
                    dateLastModified: '',
                    likes: [],
                    lock: false,
                    price: 0
                })
        })
}