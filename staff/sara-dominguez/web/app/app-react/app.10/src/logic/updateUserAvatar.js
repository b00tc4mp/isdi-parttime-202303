console.log('update-user-avatar')

import { validateId, validateUserAvatar, validateCallback } from "./helpers/validators.js"
import { saveUser, findUserById } from "../data.js"


export function updateUserAvatar(userId, newAvatar, callback) {
    validateId(userId)
    validateUserAvatar(newAvatar)
    validateCallback(callback)

   findUserById(userId, user => {
       if(!user) {
           callback(new Error ('User not found'))

           return
    } 
       user.avatar = newAvatar
       saveUser(user, () => callback(null))
   })
}

