const { 
    validators: { validateId },
    errors: { ExistenceError },
 } = require('com')

const { User, Post } = require('../../data/models')

module.exports = (userId) => {
    validateId(userId, 'user id')

    return (async () => {
        const user = await User.findById(userId).lean()

        if (!user) throw new ExistenceError(`User with id ${userId} not found`)

        const posts = await Post.find().sort('-date').populate('author', '-password -__v').lean()

        posts.forEach(post => {
            post.id = post._id.toString()

            delete post._id

            if (post.author._id) {
                post.author.id = post.author._id.toString()

                delete post.author._id
            }   
        })

        const favPosts = posts.filter(post => user.favs.some(id => id.toString() === post.id))

        return favPosts     
    
    })()
}



