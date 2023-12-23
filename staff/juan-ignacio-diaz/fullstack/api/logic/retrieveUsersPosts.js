const { 
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

const { User, Post } = require('../data/models')

module.exports = (userId) => {
    validateId(userId, 'user id')

    return (async () => { 
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError('user not found')

        const posts = await Post.find({"author": userId})
            .sort('-date')
            .populate('author', 'name avatar')
            .populate('likes', 'name avatar').lean()
        posts.forEach(post => {                        
            post.id = post._id.toString()
            delete post._id

            post.fav = user.favs.some(fav => fav.toString() === post.id)

            if (post.author._id) {
                post.author.id = post.author._id.toString()
                delete post.author._id
            }
            
            if (post.likes.length>0) {
                post.likes.forEach(like => {
                    if (like._id) {
                        like.id = like._id.toString()
                        delete like._id
                    }
                })
            } 
        })

        return posts
    })()
}
