console.debug('load retrieve user')

import { validateId } from './helpers/validators'
import { findUserById } from '../data'

export const retrieveUser = (userId, callback) => {
    validateId(userId, 'user id')

    findUserById(userId, foundUser => {
        if(!foundUser){
            alert(new Error('User not found'))

            return
        } 
    
        const user = {
            id: foundUser.id,
            name: foundUser.name,
        }
    
        if (foundUser.avatar)
            user.avatar = foundUser.avatar
    
        callback(null, user)
    })
}