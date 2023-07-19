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

    await Post.updateOne(
      { _id: postId },
      { $push: { comments: { author: user.name, authorId: new ObjectId(userId), text: commentText }}}
    )
  })()

  // return Promise.all([User.findById(userId), Post.findById(postId)])
  //   .then(([user, post]) => {
  //     if(!user) throw new ExistenceError('User not found.')

  //     if(!post) throw new ExistenceError('Post not found.')

  //     return Post.updateOne(
  //       { _id: postId },
  //       { $push: { comments: { author: user.name, authorId: new ObjectId(userId), text: commentText }}}
  //     )
  //   })
}