const {
  validators: { validateId, validateUrl, validatePassword },
  errors: { ExistenceError }
} = require('com')
require('dotenv').config()
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = (userId, newAvatarUrl, password) => {
  validateId(userId, 'user id')
  validateUrl(newAvatarUrl, 'new avatar url')
  validatePassword(password)

  const { users } = context

  return users.findOne({ _id: new ObjectId(userId) })
    .then(user => {
      if(!user) throw new Error('User not found.')

      if(newAvatarUrl === user.avatar) throw new ExistenceError('New avatar is the same as the old one.')
      
      if(user.password !== password) throw new ExistenceError('Incorrect password.')

      return users.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { avatar: newAvatarUrl }}
      )
    })
}