import { validatePassword, validateId } from './helpers/validators.mjs'
import { findUserById } from './helpers/data-managers.mjs'

export default function updateUserPassword(userId, password, newPassword, newPasswordConfirm) {
    validateId(userId, 'user id')
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    validatePassword(newPasswordConfirm, 'new password confirm')

    const foundUser = findUserById(userId)

    if (!foundUser)
        throw new Error('user not found')

    if (password !== foundUser.password)
        throw new Error('wrong password')

    if (newPassword !== newPasswordConfirm)
        throw new Error('password confirmation mismatch')

    if (newPassword === password)
        throw new Error('new password equals old password')

    foundUser.password = newPassword
}