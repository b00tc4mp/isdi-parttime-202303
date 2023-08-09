const {
  validators: { validateId, validateText },
  errors: { ExistenceError }
} = require('com')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

const { User, Post } = require('../data/models')

module.exports = (userId, postId, commentText) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  validateText(commentText, 'comment text')

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError('User not found.')

    const post = await Post.findById(postId)
    if(!post) throw new ExistenceError('Post not found.')

    const newComment = { author: user.name, authorId: new ObjectId(userId), text: commentText }

    post.comments.push(newComment)

    await post.save()

    // await Post.updateOne(
    //   { _id: postId },
    //   { $push: { comments: { author: user.name, authorId: new ObjectId(userId), text: commentText }}}
    // )
  })()
}