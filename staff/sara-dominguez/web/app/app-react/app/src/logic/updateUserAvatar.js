console.log('update-user-avatar')

import { validateId, validateUserAvatar } from "./helpers/validators.js"
import { saveUser, findUserById } from "../data.js"

// export function updateUserAvatar(userId, newAvatar) {
//     validateId(userId)
//     validateUserAvatar(newAvatar)

//    const user = findUserById(userId)

//     if(!user) throw new Error ('User not found') 
        
//     user.avatar = newAvatar
    
//     saveUser(user)
// }

export function updateUserAvatar(userId, newAvatar, callback) {
    validateId(userId)
    validateUserAvatar(newAvatar)

   findUserById(userId, user => {
       if(!user) {
           callback(new Error ('User not found'))

           return
    } 
       user.avatar = newAvatar
       saveUser(user)
       
       callback(null, user)
   })
}

