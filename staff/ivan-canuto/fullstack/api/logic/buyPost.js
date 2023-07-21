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

  return (async () => {
    const user = await User.findById(userId)

    if(!user) throw new ExistenceError(`User with id ${userId} not found.`)

    const post = await Post.findById(postId)
    
    if(!post) throw new ExistenceError(`Post with id ${postId} not found.`)
    if(!post.onSale) throw new InvalidRequestError('This post is not on sale.')
    if(post.onSale === 'Sold') throw new InvalidRequestError('This post is already sold.')

    await Post.updateOne(
      { _id: postId },
      { $set : { onSale: 'Sold' } }
    )
  })()
}