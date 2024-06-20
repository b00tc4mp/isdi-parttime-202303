import {validateId} from './helpers/validators.js'
import {findUserById, posts} from '../data.js'

export default function retrievePosts(userId, callback) {
    validateId (userId, 'user id')

    findUserById(userId, user => {
        if(!user) {
            callback(new Error (`user with id ${userId} not found`))
            return
        }

        callback(null, posts().toReversed())
    })
}