require('dotenv').config()
const context = require('./context')
const { ObjectId } = require('mongodb')
const { validators: { validateId, validatePostUrl, validateText } } = require('com')


module.exports = function updatePost(userId, postId, imageUrl, text) {
    validateId(userId)
    validateId(postId)
    validatePostUrl(imageUrl)
    validateText(text)

    const { users, posts } = context

    return Promise.all([users.findOne({ _id: new ObjectId(userId) }), posts.findOne({ _id: new ObjectId(postId) })
    ])
        .then(([user, post]) => {
            if (!user) throw new TypeError('User not found!')
            if (!post) throw new TypeError('Post not found!')

            if (post.author.toString() !== userId.toString()) throw new Error(`post with id ${postId} does not belong to user with id ${userId}`)

            return posts.updateOne({ _id: new ObjectId(postId) }, {
                $set: { image: imageUrl, text: text }
            })
        })
}



