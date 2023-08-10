const {
  validators: { validateId, validateText },
  errors: { ExistenceError, UnknownError }
} = require('com')
const { User, Post } = require('../data/models')

module.exports = (userId, postId, title, content) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  validateText(title, 'post title')
  validateText(content, 'post title')

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError('User not found.')

    const post = await Post.findById(postId)
    if(!post) throw new ExistenceError('Post not found.')

    if (post.author.toString() !== userId) throw new UnknownError('This user is not the owner of the post.')

    await Post.updateOne(
      { _id: postId },
      { $set: { 
        title: title,
        text: content
      }}
    )
  })()
}