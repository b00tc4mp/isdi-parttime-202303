const { validators: { validateId, validatePassword } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')

module.exports = (userId, password, newPassword, newPasswordConfirm) => {
  validateId(userId, 'user id')
  validatePassword(password)
  validatePassword(newPassword, 'new password')
  validatePassword(newPasswordConfirm, 'new password confirm')

  if(newPassword.length < 6)
    throw new Error('The new password is too short.')

  if(newPassword !== newPasswordConfirm)
    throw new Error('The new passwords do not match.')

  const { users } = context

  return users.findOne({ _id: new ObjectId(userId) })
    .then(user => {
      if(!user) throw new Error('User not found.')

      if(user.password !== password) throw new Error('Incorrect password.')
  
      if(user.password === newPassword) throw new Error('The new password is the same as the old one.')

      return users.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { password: newPassword }}
      )
    })
}