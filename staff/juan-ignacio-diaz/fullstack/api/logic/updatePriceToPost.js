const { validators: { validateId, validateNumber } } = require('com')

const { ObjectId } = require('mongodb')

module.exports = (userId, postId, price) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateNumber(price)

    const { users , posts } = context

    const promises = []

    promises.push(users.findOne({ _id: new ObjectId(userId) }))

    promises.push(posts.findOne({ _id: new ObjectId(postId)}))

    return Promise.all(promises)
        .then(([user, post]) => {
            if (!user) throw new Error('user not found')

            if (!post) throw new Error('user not found')

            if (user.id !== post.author)
                throw new Error(`Post doesn't belong to this user`)

            return posts.updateOne({ _id: new ObjectId(postId) }, { $set: { price: price }}) 
        })          
}