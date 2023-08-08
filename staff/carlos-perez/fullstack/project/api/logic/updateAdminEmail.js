const {
    validators: { validateId,validateEmail },
    errors: {ExistenceError, ContentError}
} = require('com')
const { Administrator } = require('../data/models')
  
  module.exports = function updateUserEmail(adminId,email,newEmail,newEmailConfirm) 
  {
    validateId(adminId, 'User ID')
    validateEmail(email)
    validateEmail(newEmail, 'New email')
    validateEmail(newEmailConfirm, 'New email confirmation')
  
    if (newEmail !== newEmailConfirm)
      throw new Error('The new email does NOT match the confirmation one')
  
    if (newEmail === email)
      throw new Error('Do NOT use your old email as the new one. Change it.')
  
  
    return Administrator.findById(adminId).then((admin) => {
      if (!admin) throw new ExistenceError('Administrator not found!')
  
      if (admin.email !== email) throw new ContentError('Wrong email')

      admin.email=newEmail;
  
      return admin.save()
    })
  }