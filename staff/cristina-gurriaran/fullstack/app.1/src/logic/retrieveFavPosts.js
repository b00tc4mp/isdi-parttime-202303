import { validators } from 'com'
import { findUserById, loadPosts } from '../data'
const { validateId, validateCallback } = validators




export default function retrieveFavPosts(userId, callback) {
    validateId(userId, 'user id')
    validateCallback(callback)


    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`user with id ${userId} not found`))
            return
        }

        loadPosts(posts => {
            const _posts = posts.filter(post => user.favs.includes(post.id))
            callback(null, _posts)
            
        })

     
    })
}




