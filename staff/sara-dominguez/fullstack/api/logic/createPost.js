const {
    validators: { validateId, validatePostUrl, validateText, validateCallback },
    errors: { ExistenceError }
} = require('com')
const { User, Post } = require('../data/models')


module.exports = function createPost(userId, image, text) {
    validateId(userId)
    validatePostUrl(image)
    validateText(text)


    return User.findById({ _id: userId })
        .then(user => {
            if (!user) throw new ExistenceError('user not found')


            return Post.create({
                author: userId,
                image: image,
                text: text,

            })


        })
}