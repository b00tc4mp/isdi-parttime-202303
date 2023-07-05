const { 
    validators: { validateId },
    errors: { ExistenceError, AuthError }  
} = require('com')

const { User, Post } = require('../data/models')

module.exports = (userId, postId) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    const promises = []

    promises.push(User.findById(userId))
    promises.push(Post.findOne(postId))

    return Promise.all(promises)
        .then(([user, post]) => {
            if (!user) throw new ExistenceError('user not found')

            if (!post) throw new ExistenceError('user not found')

            if (user._id.toString() !== post.author)
                throw new AuthError(`Post doesn't belong to this user`)

            const promisesUpdate = []

            promisesUpdate.push(Post.deleteOne({ _id: new ObjectId(postId)}))              
            promisesUpdate.push(User.find({favs: postId}))
           
            return Promise.all(promisesUpdate)
                .then(([_ , tmpUsers]) => {
                    tmpUsers.forEach(user => {                        
                        const favs = user.favs
                        favs.splice(favs.findIndex(fav => fav === postId), 1)

                        return users.updateOne({ _id: new ObjectId(user._id) }, { $set: { favs: favs }})
                    })
                })

        })  
        .then(() => {})      
}
