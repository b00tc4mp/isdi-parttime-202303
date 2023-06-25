const { validators: { validateId } } = require('com')

const { ObjectId } = require('mongodb')
const context = require('./context')

module.exports = (userId, postId) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    const { users , posts } = context

    const promises = []

    promises.push(users.findOne({ _id: new ObjectId(userId) }))
    promises.push(posts.findOne({ _id: new ObjectId(postId) }))

    return Promise.all(promises)
        .then(([user, post]) => {
            if (!user) throw new Error('user not found')

            if (!post) throw new Error('user not found')

            const likes = post.likes

            const index = likes.indexOf(userId)
        
            if (index < 0)
                likes.push(userId)
            else 
                likes.splice(index, 1)

            return posts.updateOne({ _id: new ObjectId(postId) } ,
            { $set: { likes: likes }}) 
       })
}



