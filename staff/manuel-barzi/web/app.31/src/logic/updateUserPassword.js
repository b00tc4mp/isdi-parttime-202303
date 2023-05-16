import { validatePassword, validateId } from './helpers/validators'
import { findUserById } from './helpers/data-managers'
import { saveUser } from '../data'

export default function updateUserPassword(userId, password, newPassword, newPasswordConfirm) {
    validateId(userId, 'user id')
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    validatePassword(newPasswordConfirm, 'new password confirm')

    const user = findUserById(userId)

    if (!user)
        throw new Error('user not found')

    if (password !== user.password)
        throw new Error('wrong password')

    if (newPassword !== newPasswordConfirm)
        throw new Error('password confirmation mismatch')

    if (newPassword === password)
        throw new Error('new password equals old password')

    user.password = newPassword

    saveUser(user)
}