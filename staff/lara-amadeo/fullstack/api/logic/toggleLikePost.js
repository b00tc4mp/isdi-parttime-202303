const { User, Post } = require('../data/models')
const { errors: { ExistanceError } } = require('com')

module.exports = function toggleLikePost(userId, postId) {

    return Promise.all([User.findById(userId), Post.findById(postId)])
        .then(([user, post]) => {
            if (!user) throw new ExistanceError(`User with id ${userId} not found`)
            if (!post) throw new ExistanceError(`Post with id ${postId} not found`)

            if (!user.likedPosts.some(fav => fav.toString() === postId)) {
                post.likes.push(userId)
                user.likedPosts.push(postId)

                return Promise.all([user.save(), post.save()])
            } else {
                const indexPostInUser = user.likedPosts.findIndex(id => id.toString() === postId)
                user.likedPosts.splice(indexPostInUser, 1)

                const indexUserInPost = post.likes.findIndex(id => id.toString() === userId)
                post.likes.splice(indexUserInPost, 1)

                return Promise.all([user.save(), post.save()])
            }
        })
        .then(() => { })
}


// return Promise.all([users.findOne({ _id: new ObjectId(userId) }), posts.findOne({ _id: new ObjectId(postId) })])
//     .then(([user, post]) => {




//         if (!user.likedPosts.some(fav => fav.toString() === postId)) {
//             post.likes.push(new ObjectId(userId))
//             user.likedPosts.push(new ObjectId(postId))
//         } else {
//             const indexPostInUser = user.likedPosts.findIndex(id => id.toString() === postId)
//             user.likedPosts.splice(indexPostInUser, 1)

//             const indexUserInPost = post.likes.findIndex(id => id.toString() === userId)
//             post.likes.splice(indexUserInPost, 1)
//         }

//         return Promise.all([users.updateOne({ _id: new ObjectId(userId) }, { $set: { likedPosts: user.likedPosts } }), posts.updateOne({ _id: new ObjectId(postId) }, { $set: { likes: post.likes } })])
//     })