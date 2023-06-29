const { validators: { validateId } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = (userId, postId) => {
  console.log(userId, postId)
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  
  const { users, posts } = context

  return Promise.all([users.findOne({ _id: new ObjectId(userId) }), posts.findOne({ _id: new ObjectId(postId) })])
    .then(([user, post]) => {
      if(!user) throw new Error(`User with id ${userId} not found.`)

      if(!post) throw new Error(`Post with id ${postId} not found.`)
      
      if(!post.onSale) throw new Error('This post is not on sale.')

      if(post.onSale === 'Sold') throw new Error('This post is already sold.')

      return posts.updateOne(
        { _id: new ObjectId(postId) },
        { $set : { onSale: 'Sold' } }
      )
    })
}