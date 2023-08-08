const {
    validators: { validateId, validatePassword },
    errors: { ExistenceError, ContentError, AuthError }
} = require('com')
const { Administrator } = require('../data/models')
const bcrypt = require('bcryptjs')

module.exports = function updateUserEmail(adminId, password, newPassword, newPasswordConfirm) {
    validateId(adminId, 'User ID')
    validatePassword(password)
    validatePassword(newPassword, 'New password')
    validatePassword(newPasswordConfirm, 'New password confirmation')

    if(newPassword!==newPasswordConfirm) throw new ContentError('New password and confirmation do NOT match. Check it')

    return Administrator.findById(adminId).then((admin) => {
        if (!admin) throw new ExistenceError('Administrator not found!')

        const match = bcrypt.compareSync(password, admin.password)

        if (!match) throw new AuthError('Wrong password')

        const matchReuse = bcrypt.compareSync(newPassword, admin.password)

        if(matchReuse) throw new ContentError('Do NOT use old passwords')

        admin.password = bcrypt.hashSync(newPassword, 10);

        return admin.save()
    })
}