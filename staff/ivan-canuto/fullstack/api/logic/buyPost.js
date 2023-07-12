const {
  validators: { validateId },
  errors:  { ExistenceError, InvalidRequestError }
} = require('com')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

const { User, Post } = require('../data/models')

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
  
  return Promise.all([User.findById(userId), Post.findById(postId)])
    .then(([user, post]) => {
      if(!user) throw new ExistenceError(`User with id ${userId} not found.`)

      if(!post) throw new ExistenceError(`Post with id ${postId} not found.`)
      
      if(!post.onSale) throw new InvalidRequestError('This post is not on sale.')

      if(post.onSale === 'Sold') throw new InvalidRequestError('This post is already sold.')

      return Post.updateOne(
        { _id: postId },
        { $set : { onSale: 'Sold' } }
      )
    })
}