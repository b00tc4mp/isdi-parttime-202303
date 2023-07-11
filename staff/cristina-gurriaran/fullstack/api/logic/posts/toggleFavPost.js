const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { User, Post } = require('../../data/models')


module.exports = (userId, postId) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')


    return Promise.all([
        User.findById(userId).lean(),
        Post.findById(postId)
    ])
        .then(([user, post])=> {
            if (!user) throw new ExistenceError(`User with id ${userId} not found`)
            if (!post) throw new ExistenceError(`Post with id ${postId} not found`)

            const index = user.favs.findIndex((id) => id.toString() === postId)

                if (index < 0) {
                     return User.updateOne(
                        { _id: userId },
                        { $push: { favs: postId } }
                    )

                } else 
                    user.favs.splice(index, 1)
                
                return User.updateOne(
                    { _id: userId },
                    { $set: { favs: user.favs } }
                )
        })
}

