const { validators: { validateId, validateCallback } } = require('com')

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

            const favs = user.favs

            const index = favs.indexOf(postId)

            if (index < 0)
                favs.push(postId)
            else {
                favs.splice(index, 1)
            } 

            return users.updateOne({ _id: new ObjectId(userId) } ,
                { $set: { favs: favs }}) 
        }) 
}



