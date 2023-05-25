
import { validateId } from "./helpers/validators"
import { findUserById } from "./helpers/data-managers"

export function getLoggedUser(userID) {
    validateId(userID, 'user id')
    
    const foundUser = findUserById(userID)
    if(!foundUser) throw new Error('user not found')

    const user = {
        name: foundUser.name,
    }

    if (foundUser.avatar) {
        user.avatar = foundUser.avatar
    }
    
    return user
}