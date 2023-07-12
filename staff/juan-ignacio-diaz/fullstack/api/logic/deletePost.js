const { 
    validators: { validateId },
    errors: { ExistenceError, AuthError }  
} = require('com')

const { User, Post } = require('../data/models')

module.exports = (userId, postId) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    return Promise.all([User.findById(userId), Post.findById(postId)])
        .then(([user, post]) => {
            if (!user) throw new ExistenceError('user not found')

            if (!post) throw new ExistenceError('user not found')

            if (user._id.toString() !== post.author.toString())
                throw new AuthError(`Post doesn't belong to this user`)

            return User.find({ favs: postId })
                .then((users) => {
                    const usersUpdated = users.map((user) => {
                        return User.findByIdAndUpdate(userId,
                            { $pullAll: { favs: [postId] } })

                            // si no funciona $pullAll
                            //{ $set: { favs: user.favs.splice(user.favs.findIndex(fav => fav === postId), 1) }})
                    })
        
                    return Promise.all([...usersUpdated, Post.findByIdAndDelete(postId)])
                        .then(() => { })   
                })
        })  
           
}