const { 
    validators: { validateId },
    errors: { ExistenceError } 
} = require('com')

const { User, Post } = require('../data/models')

module.exports  = (userId, postId) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    const promises = []

    promises.push(User.findById(userId))
    promises.push(Post.findById(postId))

    return Promise.all(promises)
        .then(([user, post]) => {
            if (!user) throw new ExistenceError('user not found')

            if (!post) throw new ExistenceError('post not found')

            const favs = user.favs

            const index = favs.map(fav => fav.toString()).indexOf(postId)

            if (index < 0)
                favs.push(post._id)
            else {
                favs.splice(index, 1)
            } 

            return User.findByIdAndUpdate(userId, { $set: { favs: favs }})
                .then(() => { })   
        }) 
}



