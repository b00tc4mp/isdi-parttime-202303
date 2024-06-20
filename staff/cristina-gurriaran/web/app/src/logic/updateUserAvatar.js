import {validateId, validateUrl, validateCallback} from './helpers/validators.js'
import {findUserById , saveUser} from '../data.js'



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