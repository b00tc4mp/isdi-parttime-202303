import { findUserById } from '../data.js'

export default function retrieveUser(userId, callback) {
    
    findUserById(userId, user => {
        if (!user) {
            callback(new Error('user not found'))

            return
        }
    
        const _user = {
            name: user.name,
            avatar: user.avatar
        }
    
        callback(null, _user)
    })
}