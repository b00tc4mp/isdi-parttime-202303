const context = require('../context')
const { ObjectId } = require('mongodb')
const { validators: { validateUserId, validatePostId } } = require('com')
module.exports = (userId, postId) => {
    validateUserId(userId)
    validatePostId(postId)

    const { posts } = context
    const _post = { _id: new ObjectId(postId) }

    return posts.findOne(_post)
        .then(post => {
            if (!post) throw new Error('post not found')
            const indexLikedPost = post.likes?.indexOf(userId)
            if (indexLikedPost < 0) {
                post.likes.push(userId)
                return posts.updateOne(_post, {
                    $set: {
                        likes: post.likes
                    }
                })
            } else {
                post.likes.splice(indexLikedPost, 1)
                return posts.updateOne(_post, {
                    $set: {
                        likes: post.likes
                    }
                })
            }
        })
}

// db.posts.updateOne({ _id: ObjectId("649727c3250633946b2b02e5") }, { $set: { likes: [] }})