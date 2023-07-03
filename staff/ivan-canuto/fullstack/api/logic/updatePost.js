const {
  validators: { validateId, validateUrl, validateText },
  errors: { ExistenceError, InvalidRequestError }
} = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = (userId, postId, imageUrl, postText) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  validateUrl(imageUrl,'image url')
  validateText(postText, 'post text')

  const { users, posts } = context

  return Promise.all([users.findOne({ _id: new ObjectId(userId) }), posts.findOne({ _id: new ObjectId(postId) })])
    .then(([user, post]) => {
      if(!user) throw new ExistenceError('User not found.')

      if(!post) throw new ExistenceError('Post not found.')

      if (post.author.toString() !== userId) throw new InvalidRequestError('This user is not the owner of the post.')

      return posts.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { 
          image: imageUrl,
          text: postText
        }}
      )
    })
}