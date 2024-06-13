const {
  validators: { validateId, validatePassword },
  errors: { ExistenceError, AuthError, ContentError }
} = require('com')
const { User } = require('../data/models')

module.exports = (userId, password, newPassword, newPasswordConfirm) => {
  validateId(userId, 'user id')
  validatePassword(password)
  validatePassword(newPassword, 'new password')
  validatePassword(newPasswordConfirm, 'new password confirm')

  if(newPassword.length < 6)
    throw new RangeError('The new password is too short.')

  if(newPassword !== newPasswordConfirm)
    throw new ContentError('The new passwords do not match.')

  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError('User not found.')

    if(user.password !== password) throw new AuthError('Wrong credentials.')
  
    if(user.password === newPassword) throw new ContentError('The new password is the same as the old one.')

    await User.updateOne(
      { _id: userId },
      { $set: { password: newPassword }}
    )
  })()
}