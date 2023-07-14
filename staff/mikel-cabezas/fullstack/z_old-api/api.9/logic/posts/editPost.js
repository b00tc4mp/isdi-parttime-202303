const { ObjectId } = require('mongodb')
const context = require('../context')
const { validators: { validateUserId, validateText, validatePostId } } = require('com')
module.exports = (userId, postId, title, text, image, visibility) => {
    validateUserId(userId)
    validatePostId(postId)
    validateText(title)
    validateText(text)

    const { posts } = context
    const _post = { _id: new ObjectId(postId) }
    let visibilityStatus
    if (visibility) {
        visibilityStatus = 'public'
    } else {
        visibilityStatus = 'private'
    }

    return posts.findOne(_post)
        .then(post => {
            if (!post) throw new Error('post not found')

            return posts.updateOne(_post, {
                $set: {
                    image: image,
                    title: title,
                    text: text,
                    date: new Date(post.date),
                    lastModify: new Date(),
                    comments: post.comments,
                    likes: post.likes,
                    visibility: visibilityStatus,
                    location: post.location
                }
            })
        })

}

