const {
    validators: { validateId, validatePassword },
    errors: {ExistenceError, ContentError}
} = require('com')
const { Administrator } = require('../../data/models')
const bcrypt = require('bcryptjs')
  
  module.exports = function (adminId, password, passwordConfirm){

    validateId(adminId, 'Administrator ID')
    validatePassword(password, 'Password')
    validatePassword(passwordConfirm, 'Password Confirmation')

    if(password!==passwordConfirm) throw new ContentError('Password and confirmation do NOT match. Check it')

    return Administrator.findById(adminId).then((admin) => {

        if (!admin) throw new ExistenceError('Administrator not found!')

        const match = bcrypt.compareSync(password, admin.password)

        if (!match) throw new AuthError('Wrong password')

        return Administrator.deleteOne({_id: adminId})
    })

  }