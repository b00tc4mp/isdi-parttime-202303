require('dotenv').config()
const { validators: { validateText, validateUrl, validateId } } = require('com')
const { errors: { ExistenceError } } = require('com')

const { User, Post } = require('../data/models')

module.exports = (userId, imageUrl, postText) => {
  validateId(userId, 'user id')
  validateUrl(imageUrl, 'image url')
  validateText(postText, 'post text')

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError(`User with id ${userId} not found.`)

    const date = new Date

    await Post.create({
      author: user._id,
      image: imageUrl,
      text: postText,
      date: date.toLocaleDateString()
    })
  })()

  // return User.findById(userId)
  //   .then(user => {
  //     if(!user) throw new ExistenceError(`User with id ${userId} not found.`)

  //     const date = new Date

  //     return Post.create({
  //       author: user._id,
  //       image: imageUrl,
  //       text: postText
  //     })
  //   })
}