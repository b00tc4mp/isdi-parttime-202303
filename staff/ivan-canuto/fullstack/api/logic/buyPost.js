const {
  validators: { validateId },
  errors:  { ExistenceError, InvalidRequestError }
} = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

/**
 * Buys post by user
 * 
 * @param {string} userId The user id
 * @param {string} postId The post id
 * @returns {Promise}
 * 
 * 
 */

module.exports = (userId, postId) => {
  validateId(userId, 'user id')
  validateId(postId, 'post id')
  
  const { users, posts } = context

  return Promise.all([users.findOne({ _id: new ObjectId(userId) }), posts.findOne({ _id: new ObjectId(postId) })])
    .then(([user, post]) => {
      if(!user) throw new ExistenceError(`User with id ${userId} not found.`)

      if(!post) throw new ExistenceError(`Post with id ${postId} not found.`)
      
      if(!post.onSale) throw new InvalidRequestError('This post is not on sale.')

      if(post.onSale === 'Sold') throw new InvalidRequestError('This post is already sold.')

      return posts.updateOne(
        { _id: new ObjectId(postId) },
        { $set : { onSale: 'Sold' } }
      )
    })
}