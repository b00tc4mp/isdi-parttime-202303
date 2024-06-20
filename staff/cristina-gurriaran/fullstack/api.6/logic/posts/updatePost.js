const { 
    validators: { validateId, validateUrl, validateText },
    errors: { ExistenceError, PermitError }
 } = require('com')
const context = require('../context')
const { ObjectId } = require('mongodb')


module.exports = function updatePost (userId, postId, image, location, title, text){
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateUrl(image, 'image url')
    validateText(text)

    const { users , posts } = context

    return Promise.all([users.findOne({ _id: new ObjectId(userId) }), posts.findOne({ _id: new ObjectId(postId) })])
        .then(([user, post]) => {
            if (!user) throw new ExistenceError(`User with id ${userId} not found`)
            if (!post) throw new ExistenceError(`Post with id ${postId} not found`)
            if (userId !== post.author.toString()) throw new PermitError(`Post with id ${postId} does not belong to user with id ${userId} `)

            return posts.updateOne({ _id: new ObjectId(postId) }, { $set: { image: image, location : location, title : title , text : text},  } )
        })
}