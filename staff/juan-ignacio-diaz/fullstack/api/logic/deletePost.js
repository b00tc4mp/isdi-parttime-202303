const { validators: { validateId } } = require('com')

const { ObjectId } = require('mongodb')
const context = require('./context')

module.exports =  (userId, postId) => {
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

            if (user.id !== post.author)
                throw new Error(`Post doesn't belong to this user`)

            const promisesUpdate = []

            promisesUpdate.push(posts.deleteOne({ _id: new ObjectId(postId)}))
                
            promisesUpdate.push(users.find({favs: postId})
                .then(user => {
                    user.favs.splice(user.favs.findIndex(favs => favs === postId), 1)
                }))
           
            return Promise.all(promisesUpdate)
        })
                

}
