const { validators: { validateText, validateUrl, validateId } } = require('com')
require('dotenv').config()
const { errors: { ExistenceError } } = require('com')
// const { Schema: { Types: { ObjectId } } } = require('mongoose')
const { User, Post } = require('../data/models')

module.exports = (userId, imageUrl, postText) => {
  validateId(userId, 'user id')
  validateUrl(imageUrl, 'image url')
  validateText(postText, 'post text')

  return User.findById(userId)
    .then(user => {
      if(!user) throw new ExistenceError(`User with id ${userId} not found.`)

      let date = new Date

      const newPost = {
        author: user._id,
        image: imageUrl,
        text: postText,
        date: date.toLocaleDateString(),
        likes: [],
        visible: true,
        onSale: null,
        comments: []
      }

      return Post.create(newPost)
    })
}