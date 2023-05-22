import { validateId, validateCallback } from './helpers/validators'
import { findUserById } from '../data'

export default function retrieveUser(userId, callback) {
    validateId(userId)
    validateCallback(callback)    

    findUserById(userId, user => {
            if (!user) {
                callback(new Error("Error to user"))

                return
            }
    
            let tmpUser = {
                id: user.id,
                name: user.name
            }
        
            if (user.avatar)
                tmpUser.avatar = user.avatar
        
            if (user.savePosts)
                tmpUser.savePosts = user.savePosts
        
            if (user.mode)
                tmpUser.mode = user.mode
        
            callback(null, tmpUser)
        }
    )
}