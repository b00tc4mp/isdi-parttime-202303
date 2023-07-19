const {
  validators: { validateId, validateUrl, validateText },
  errors: { ExistenceError, InvalidRequestError }
} = require('com')
const { User, Post } = require('../data/models')

module.exports = (userId, postId, imageUrl, postText) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  validateUrl(imageUrl,'image url')
  validateText(postText, 'post text')

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError('User not found.')

    const post = await Post.findById(postId)
    if(!post) throw new ExistenceError('Post not found.')
    if (post.author.toString() !== userId) throw new InvalidRequestError('This user is not the owner of the post.')

    await Post.updateOne(
      { _id: postId },
      { $set: { 
        image: imageUrl,
        text: postText
      }}
    )
  })()

  // return Promise.all([User.findById(userId), Post.findById(postId)])
  //   .then(([user, post]) => {
  //     if(!user) throw new ExistenceError('User not found.')

  //     if(!post) throw new ExistenceError('Post not found.')

  //     if (post.author.toString() !== userId) throw new InvalidRequestError('This user is not the owner of the post.')

  //     return Post.updateOne(
  //       { _id: postId },
  //       { $set: { 
  //         image: imageUrl,
  //         text: postText
  //       }}
  //     )
  //   })
}