const {
  validators: { validateId, validateText },
  errors: { ExistenceError }
} = require('com')
const { Schema: { Types: { ObjectId } } } = require('mongoose')
const { User, Post } = require('../data/models')

module.exports = (userId, postId, commentText) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  validateText(commentText, 'comment text')

  return Promise.all([User.findById(userId), Post.findById(postId)])
    .then(([user, post]) => {
      if(!user) throw new ExistenceError('User not found.')

      if(!post) throw new ExistenceError('Post not found.')
      
      let id = 'comment-1'
      const lastComment = post.comments[post.comments.length - 1]
      if (lastComment) id = 'comment-' + (parseInt(lastComment.id.slice(8)) + 1)

      return Post.updateOne(
        { _id: postId},
        { $push: { comments: { id: id, author: user.name, authorId: new ObjectId(userId), text: commentText }}}
      )
    })
}