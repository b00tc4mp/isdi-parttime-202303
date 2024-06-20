import {validateId, validateUrl} from './helpers/validators.mjs'
import {findUserById} from './helpers/data-managers.mjs'
import { saveUser } from '../data.mjs'


export default function updateUserAvatar (userId, avatar) {
    validateId(userId, 'user id')
    validateUrl(avatar, 'avatar url')

    const user = findUserById(userId)

    if(!user) 
        throw new Error ('user not found')

    user.avatar = avatar
    saveUser(user)
}