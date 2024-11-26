console.log('load retrieve-user')

import { validateId } from "./helpers/validators.mjs"
import { findUserById } from "./helpers/data-managers.mjs"

export function retrieveUser(userId) {
    validateId(userId)
     
     let foundUser = findUserById(userId)
    
     if(!foundUser) throw new Error ('User not found') 
 
     else{
         const user = {
             name: foundUser.name, 
         } 
         if(foundUser.avatar) 
             user.avatar = foundUser.avatar
 
         return user
     }
 }
 