import {validateId, validateCallback} from './helpers/validators.js'
import {findUserById, loadPosts} from '../data.js'

export default function retrievePosts(userId, callback) {
    validateId (userId, 'user id')
    validateCallback(callback)

    findUserById(userId, user => {
        if(!user) {
            callback(new Error (`user with id ${userId} not found`))
            return
        }

        loadPosts(posts=> callback(null, posts.toReversed()))
    })
}