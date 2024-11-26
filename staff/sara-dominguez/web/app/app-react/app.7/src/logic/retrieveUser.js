console.log('load retrieve-user')

import { validateId } from "./helpers/validators.js"
import { findUserById } from "./helpers/dataManagers.js"

export default function retrieveUser(userId) {
    validateId(userId)
     
     let user= findUserById(userId)
    
     if(!user) throw new Error ('User not found') 
 
     else{

        user = {
             name: user.name, 
             avatar: user.avatar
        } 

         if(user.avatar) 
             user.avatar = user.avatar
 
         return user
     }
 }
 