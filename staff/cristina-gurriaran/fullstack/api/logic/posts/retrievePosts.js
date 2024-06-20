const { 
    validators: { validateId },
    errors: { ExistenceError }
 } = require('com')

const { User, Post } = require('../../data/models')


module.exports = userId => {
    validateId(userId, 'user id')

    return (async () => {
        const user = await User.findById(userId).lean()

        if (!user) throw new ExistenceError(`user with id ${userId} not found`)

        const posts = await Post.find().sort('-date').populate('author', '-password -__v').lean()

        posts.forEach(post => {
            post.id = post._id.toString()
            
            delete post._id

            post.fav = user.favs.some(favs => favs.toString() === post.id)

            if (post.author._id) {
                post.author.id = post.author._id.toString()
                
                delete post.author._id
            }
        })
        return posts

    })()
}