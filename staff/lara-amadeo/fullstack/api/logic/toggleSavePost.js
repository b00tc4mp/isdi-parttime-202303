const { ObjectId } = require('mongodb')
const context = require('./context')

module.exports = function toggleSavePost(userId, postId) {
    console.log(postId)
    const { users, posts } = context

    return users.findOne({_id: new ObjectId(userId)})
        .then(user => {
            if (!user) throw new Error(`User with id ${userId} not found`)

            return posts.findOne({_id: new ObjectId(postId)})
            .then(post => {
                if (!post) throw new Error(`Post with id ${postId} not found`)

                if (!user.savedPosts.includes(post._id.toString())){
                    user.savedPosts.push(post._id.toString())
                }
                else {
                    const index = user.savedPosts.findIndex(elem => elem === post._id.toString())
                    user.savedPosts.splice(index, 1)
                }
                return users.updateOne({ _id: new ObjectId(userId)}, {$set: {savedPosts: user.savedPosts}})
                .then(() => {
                    user
                })
            })
        })
}