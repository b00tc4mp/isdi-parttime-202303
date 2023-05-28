import {validateId, validateCallback} from './helpers/validators'
import {findUserById} from '../data'



export default function retrieveUser(userId, callback) {

    validateId (userId, 'user id')
    validateCallback(callback)

    findUserById(userId, user => {
        if (!user){
            callback(Error('user not found'))
            return
        }

        const _user = {
            name: user.name,
            avatar : user.avatar
        }

        callback(null, _user)
    })
}