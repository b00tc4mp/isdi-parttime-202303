const {validators: { validateId, validateEmail }} = require('com')
  
  const context = require('./context')
  const { ObjectId } = require('mongodb')
  
  module.exports = function updateUserEmail(userId,email,newEmail,newEmailConfirm) 
  {
    validateId(userId, 'User ID')
    validateEmail(email)
    validateEmail(newEmail, 'New email')
    validateEmail(newEmailConfirm, 'New email confirmation')
  
    if (newEmail !== newEmailConfirm)
      throw new Error('The new email does NOT match the confirmation one')
  
    if (newEmail === email)
      throw new Error('Do NOT use your old email as the new one. Change it.')
  
    const { users } = context
  
    return users.findOne({ _id: new ObjectId(userId) }).then((user) => {
      if (!user) throw new Error('User not found!')
  
      if (user.email !== email) throw new Error('Wrong email')
  
      return users.updateOne({ _id: new ObjectId(userId) },{ $set: { email: newEmail } })
    })
  }