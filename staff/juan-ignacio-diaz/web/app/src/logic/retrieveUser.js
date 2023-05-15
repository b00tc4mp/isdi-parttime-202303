import { validateId } from './helpers/validators'
import { findUserById } from './helpers/dataManagers'

export default function retrieveUser(userId) {
    validateId(userId)

    const foundUser = findUserById(userId)
    if (!foundUser) throw new Error("Error to user")
   
    const user = {
        id: foundUser.id,
        name: foundUser.name
    }

    if (foundUser.avatar)
        user.avatar = foundUser.avatar

    if (foundUser.savePosts)
        user.savePosts = foundUser.savePosts

    if (foundUser.mode)
        user.mode = foundUser.mode

    return user
}