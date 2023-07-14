require('dotenv').config()
const { validators: { validateText, validateUrl, validateId } } = require('com')
const { errors: { ExistenceError } } = require('com')
// const { mongoose: { Types: { ObjectId } } } = require('mongoose')

const { User, Post } = require('../data/models')

module.exports = (userId, imageUrl, postText) => {
  validateId(userId, 'user id')
  validateUrl(imageUrl, 'image url')
  validateText(postText, 'post text')

  return User.findById(userId)
    .then(user => {
      if(!user) throw new ExistenceError(`User with id ${userId} not found.`)

      const date = new Date

      return Post.create({
        author: user._id,
        image: imageUrl,
        text: postText
      })
    })
}