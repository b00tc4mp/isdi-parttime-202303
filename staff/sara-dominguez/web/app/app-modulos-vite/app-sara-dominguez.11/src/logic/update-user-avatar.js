console.log('update-user-avatar')

import { validateId, validateUserAvatar } from "./helpers/validators.js"
import { findUserById } from "./helpers/data-managers.js"

export function updateUserAvatar(id, newAvatar) {
    validateId(id)
    validateUserAvatar(newAvatar)

   let foundUser = findUserById(id)

    if(!foundUser) throw new Error ('User not found') 
        
    else{
        foundUser.avatar = newAvatar
    }
}

