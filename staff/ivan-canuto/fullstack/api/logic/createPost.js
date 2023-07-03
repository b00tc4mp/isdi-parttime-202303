const { validators: { validateText, validateUrl, validateId } } = require('com')
require('dotenv').config()
const context = require('./context')
const { ObjectId } = require('mongodb')
const { errors: { ExistenceError } } = require('com')

module.exports = (userId, imageUrl, postText) => {
  validateId(userId, 'user id')
  validateUrl(imageUrl, 'image url')
  validateText(postText, 'post text')

  const { users, posts } = context

  return users.findOne({ _id: new ObjectId(userId) })
    .then(user => {
      if(!user) throw new ExistenceError(`User with id ${userId} not found.`)

      let date = new Date

      const newPost = {
        author: new ObjectId(userId),
        image: imageUrl,
        text: postText,
        date: date.toLocaleDateString(),
        likes: [],
        visible: true,
        onSale: null,
        comments: []
      }

      return posts.insertOne(newPost)
    })
}