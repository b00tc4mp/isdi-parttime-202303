const { ObjectId } = require('mongodb')
const context = require('./context')
const { validators: { validateId } } = require('com')

module.exports = (userId) => {
    validateId(userId, 'user id')

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) {
                throw new Error('User not found')
            }

            const promises = []
            const userFavs = user.favs.map(fav => fav.toString())

            return posts.find().toArray()
                .then(postsArray => {
                    for (const post of postsArray) {
                        const isFav = userFavs.includes(post._id.toString())
                        const promise = isFav ? 
                            posts.updateOne({ '_id': post._id }, { $set: { fav: true } }) :
                            posts.updateOne({ '_id': post._id }, { $set: { fav: false } })
                        
                        promises.push(promise)
                    }

                    return Promise.all(promises)
                })
                .then(() => {
                    return posts.find().toArray()
                })
        });
}