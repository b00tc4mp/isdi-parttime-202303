import {validateId} from './helpers/validators.mjs'
import {findUserById} from './helpers/data-managers.mjs'
import { posts } from '../data.mjs'

export default function retrieveUser(userId) {

    validateId (userId, 'user id')

    const foundUser = findUserById(userId)

    if (!foundUser)
        throw new Error('user not found')

    for (elements of posts) {
        if (foundUser.id === posts.author)
        return posts.image
        
    }

}