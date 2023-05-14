console.log('update-user-avatar')

import { validateId, validateUserAvatar } from "./helpers/validators.js"
import { findUserById } from "./helpers/data-managers.js"
import { saveUser } from "../data.js"

export function updateUserAvatar(userId, newAvatar) {
    validateId(userId)
    validateUserAvatar(newAvatar)

   const user = findUserById(userId)

    if(!user) throw new Error ('User not found') 
        
    user.avatar = newAvatar
    
    saveUser(user)
}

