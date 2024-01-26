const {
    validators: { validateId, validateUrl, validateText },
    errors: { ExistenceError, UnknownError }
} = require('com')


const { User, Post, Comment } = require('../data/models')

module.exports = (userId, postId, text) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateText(text)

    // return Promise.all([
    //     User.findById(userId),
    //     Post.findById(postId)
    // ])
    //     .then(([user, post]) => {
    //         if (!user) throw new Error(`user with id ${userId} not found`)
    //         if (!post) throw new Error(`post with id ${postId} not found`)

    //         const comment = new Comment({
    //             author: userId,
    //             text
    //         })

    //         post.comments.push(comment)

    //         return post.save()
    //     })
    //     .then(() => { })

    return (async () => {
        try {
            const user = await User.findById(userId)
            const post = await Post.findById(postId)

            if (!user) throw new ExistenceError(`user with id ${userId} not found`)
            if (!post) throw new ExistenceError(`post with id ${postId} not found`)

            const comment = new Comment({
                author: userId,
                text
            })

            post.comments.push(comment)

            return post.save()
        } catch (error) {
            throw new UnknownError(error.message)
        }
    })()
}