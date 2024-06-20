import { validateId, validateCallback } from './helpers/validators'
import { findUserById, loadPosts, loadUsers } from '../data'

export default function retrieveFavPosts(userId, callback) {
    validateId(userId, 'user id')
    validateCallback(callback)

    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        loadUsers(users => {
            loadPosts(posts => {
                posts.forEach(post => {
                    
                })

               
                callback(null, posts.toReversed())
            })
        })
    })
}

