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
            if (!user) throw new Error('User not found!')
            if (!post) throw new Error('Post not found!')

            if (post.author.toString() !== userId.toString()) throw new Error(`post with id ${postId} does not belong to user with id ${userId}`)

            return posts.updateOne({ _id: new ObjectId(postId) }, {
                $set: { image: imageUrl, text: text }
            })
        })
}








    // return Promise.all([users.find().toArray(), posts.find().toArray])

    //     .then(([users, posts]) => {
    //         const user = users.findOne({ _id: new ObjectId(userId) })

    //         if (!user) throw new Error('user not found')

    //         const post = posts.findOne({ _id: new ObjectId(postId) })

    //         if (!post) throw new Error('post not found')

    //         if (post.author !== userId) throw new Error(`post with id ${postId} does not belong to user with id ${userId}`)

    //         return post.updateOne({ _id: new ObjectId(postId) }, { $set: { image: imageUrl, text: text } })












