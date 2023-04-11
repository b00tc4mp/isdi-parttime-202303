import { validateId } from './helpers/validators.mjs'
import { findUserById } from './helpers/data-managers.mjs'

export default function retrieveUser(userId) {
    validateId(userId)

    const foundUser = findUserById(userId)
    if (!foundUser) throw new Error("Error to user")
   
    const user = {
        id: foundUser.id,
        name: foundUser.name,
    }

    if (foundUser.avatar)
        user.avatar = foundUser.avatar

    return user
}