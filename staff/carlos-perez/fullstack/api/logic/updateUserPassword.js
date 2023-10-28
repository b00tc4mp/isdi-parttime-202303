const {validators: { validateId, validatePassword }} = require('com')
  
  const context = require('./context')
  const { ObjectId } = require('mongodb')
  
  module.exports = function updateUserPassword(userId,password,newPassword,newPasswordConfirm) 
  {
    validateId(userId, 'User ID')
    validatePassword(password)
    validatePassword(newPassword, 'New password')
  
    if (newPassword !== newPasswordConfirm)
      throw new Error('The new password does NOT match the confirmation one')
  
    if (newPassword === password)
      throw new Error('Do NOT use your old password as the new one. Change it.')
  
    const { users } = context
  
    return users.findOne({ _id: new ObjectId(userId) }).then((user) => {
      if (!user) throw new Error('User not found!')
  
      if (user.password !== password) throw new Error('Wrong password!')
  
      return users.updateOne({ _id: new ObjectId(userId) },{ $set: { password: newPassword } })
    })
  }