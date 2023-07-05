const { 
    validators: { validateId, validateUrl, validateText },
    errors: { ExistenceError, AuthError }
} = require('com')

const { ObjectId } = require('mongodb')
const context = require('./context')

module.exports = (userId, postId, image, text) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    if(image !== '') validateUrl(image)
    if(text !== '') validateText(text)

    const { users , posts } = context

    const promises = []

    promises.push(users.findOne({ _id: new ObjectId(userId) }))
    promises.push(posts.findOne({ _id: new ObjectId(postId) }))

    return Promise.all(promises)
        .then(([user, post]) => {
            if (!user) throw new ExistenceError('user not found')

            if (!post) throw new ExistenceError('user not found')

            if (user._id.toString() !== post.author)
                throw new AuthError(`Post doesn't belong to this user`)

            if(image === '') image = post.image
            if(text === '')  text = post.text
 
            return posts.updateOne({ _id: new ObjectId(postId) } ,
                 { $set: { image: image,
                    text: text,
                    dateLastModified: new Date }}) 
        }) 
}