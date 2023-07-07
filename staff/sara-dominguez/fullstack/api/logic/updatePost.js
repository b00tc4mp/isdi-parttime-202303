require('dotenv').config()
const { User, Post } = require('../data/models')
const { validators: { validateId, validatePostUrl, validateText } } = require('com')


module.exports = function updatePost(userId, postId, imageUrl, text) {
    validateId(userId)
    validateId(postId)
    validatePostUrl(imageUrl)
    validateText(text)



    return Promise.all([User.findById({ _id: userId }), Post.findById({ _id: postId })
    ])
        .then(([user, post]) => {
            if (!user) throw new TypeError('User not found!')
            if (!post) throw new TypeError('Post not found!')

            if (post.author.toString() !== user.id) throw new Error(`post with id ${postId} does not belong to user with id ${userId}`)

            post.image = imageUrl
            post.text = text

            return Post.updateOne({ _id: postId }, {
                $set: { image: imageUrl, text: text }
            })
        })
}



