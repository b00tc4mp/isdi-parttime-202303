import { validators } from 'com'
import {findUserById , saveUser} from '../data.js'
const { validateId, validateUrl, validateCallback } = validators




export default function updateUserAvatar (userId, avatar, callback) {
    validateId(userId, 'user id')
    validateUrl(avatar, 'avatar url')
    validateCallback(callback)

    findUserById(userId, user => {

        if(!user){
            callback(new Error ('user not found'))
            return
        }
        
        user.avatar = avatar
        saveUser(user, () => callback(null))
    })
}