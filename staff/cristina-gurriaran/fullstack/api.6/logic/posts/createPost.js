const { 
    validators: { validateId, validateUrl, validateText },
    errors: { ExistenceError },
} = require('com')

const context = require('../context')
const { ObjectId } = require('mongodb')



module.exports = function createPost(userId, image, location, title, text){
    validateId(userId, 'user id')
    validateUrl(image, 'image url')
    validateText(text)
    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new ExistenceError(`user with id ${userId} not found`)

            const post = {
                author: user._id,
                image,
                location,
                title,
                text,
                date: new Date,
                likes: [],
                favs: []
            }

            return posts.insertOne(post)
        })
}
