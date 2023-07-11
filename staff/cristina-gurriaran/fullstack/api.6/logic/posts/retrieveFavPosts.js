const { 
    validators: { validateId },
    errors: { ExistenceError },
 } = require('com')
const context = require('../context')
const { ObjectId } = require('mongodb')



module.exports = function retrieveFavPosts(userId){
    validateId (userId, 'user id')

    const { users, posts } = context 

    return Promise.all([users.findOne({ _id: new ObjectId(userId)}), posts.find().toArray()])
        .then(([user, posts]) => {
            if (!user) throw new ExistenceError(`user with id ${userId} not found`)

            // posts.forEach(post => {
            //     post.id = post._id.toString()
            //     delete post._id
            // })

            const favPosts = posts.filter(post => user.favs.some(id => id.toString() === post._id.toString()))

            return favPosts
        })
}

