const {
  validators: { validateId },
  errors: { ExistenceError }
} = require('com')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

const { User, Post } = require('../data/models')

module.exports = (userId, postId) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError('User not found.')

    const post = await Post.findById(postId)
    if(!post) throw new ExistenceError('Post not found.')

    let likesFromPost = post.likes.map(like => like.toString())

      if(likesFromPost.includes(userId))
        await Post.updateOne(
          { _id: postId },
          { $pull: { likes: new ObjectId(userId) }}
        )
      else
        await Post.updateOne(
          { _id: postId },
          { $push: { likes: new ObjectId(userId) }}
        )
  })()

  // return Promise.all([User.findById(userId), Post.findById(postId)])
  //   .then(([user, post]) => {
  //     if(!user) throw new ExistenceError('User not found.')

  //     if(!post) throw new ExistenceError('Post not found.')

  //     let likesFromPost = post.likes.map(like => like.toString())

  //     if(likesFromPost.includes(userId))
  //       return Post.updateOne(
  //         { _id: postId },
  //         { $pull: { likes: new ObjectId(userId) }}
  //       )
  //     else
  //     return Post.updateOne(
  //         { _id: postId },
  //         { $push: { likes: new ObjectId(userId) }}
  //       )
  //   })
}