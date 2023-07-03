const {
  validators: { validateId, validateText },
  errors: { ExistenceError }
} = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = (userId, postId, commentText) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  validateText(commentText, 'comment text')

  const { users, posts } = context

  return Promise.all([users.findOne({ _id: new ObjectId(userId) }), posts.findOne({ _id: new ObjectId(postId) })])
    .then(([user, post]) => {
      if(!user) throw new ExistenceError('User not found.')

      if(!post) throw new ExistenceError('Post not found.')
      
      let id = 'comment-1'
      const lastComment = post.comments[post.comments.length - 1]
      if (lastComment) id = 'comment-' + (parseInt(lastComment.id.slice(8)) + 1)

      return posts.updateOne(
        { _id: new ObjectId(postId) },
        { $push: { comments: { id: id, author: user.name, authorId: new ObjectId(userId), text: commentText }}}
      )
    })
}