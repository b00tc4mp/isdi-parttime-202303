import { validateId, validateText } from './helpers/validators'
import { findUserById } from './helpers/dataManagers'
import { saveUser } from '../data'

export default function updateUserMode(userId, mode) {
    validateId(userId)

    const user = findUserById(userId)

    if (!user)
        throw new Error('user not found')

    user.mode = mode

    saveUser(user)
}