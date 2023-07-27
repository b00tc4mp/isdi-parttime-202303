require('dotenv').config()
const {
  validators: { validateId, validateUrl, validatePassword },
  errors: { ExistenceError }
} = require('com')
const { User } = require('../data/models')
const bcrypt = require('bcryptjs')

module.exports = (userId, newAvatarUrl, password) => {
  validateId(userId, 'user id')
  validateUrl(newAvatarUrl, 'new avatar url')
  validatePassword(password)

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError('User not found.')

    if(newAvatarUrl === user.avatar) throw new ExistenceError('New avatar is the same as the old one.')
      
    const match = bcrypt.compare(password, user.password)

    if(!match) throw new ExistenceError('Incorrect password.')

    await User.updateOne(
      { _id: userId },
      { $set: { avatar: newAvatarUrl }}
    )
  })()
}