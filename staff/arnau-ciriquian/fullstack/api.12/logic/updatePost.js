const context = require('./context')
const { ObjectId } = require('mongodb')
const { validators: { validateId, validateText, validateUrl } } = require('com')

module.exports = (userId, postId, image, text) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateUrl(image, 'image url')
    validateText(text, 'post text')

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return posts.findOne({ _id: new ObjectId(postId) })
                .then(post => {
                    if (!post) throw new Error('post not found')

                    if (!post.author.equals(new ObjectId(userId))) throw new Error(`post with id ${postId} does not belong to user with id ${userId}`)

                    return posts.updateOne({ '_id': new ObjectId(postId) }, { $set: { image: image, text: text, date: (new Date).toLocaleString('en-UK') } })
                })
            })
}