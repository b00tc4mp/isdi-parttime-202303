import { validateId, validateCallback } from './helpers/validators'
import { findUserById } from '../data'

export default function retrieveUser(userId, callback) {
    validateId(userId, 'user id')
    validateCallback(callback)

    findUserById(userId, user => {
        if (!user) {
            callback(new Error('user not found'))

            return
        }
    
        const _user = {
            name: user.name,
            avatar: user.avatar,
            favs: user.favs
        }
    
        callback(null, _user)
    })
}
